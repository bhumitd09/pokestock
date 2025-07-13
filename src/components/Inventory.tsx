import { useEffect, useState, useRef } from "react";
import { useSupabaseClient, useSession } from "@supabase/auth-helpers-react";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, MoreHorizontal } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Card {
  id: number;
  name: string;
  set: string;
  condition: string;
  price: number;
  created_at: string;
}

export default function Inventory() {
  const supabase = useSupabaseClient();
  const session = useSession();
  const [cards, setCards] = useState<Card[]>([]);
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | null>(null);

  const nameRef = useRef<HTMLInputElement | null>(null);
  const [form, setForm] = useState({
    name: "",
    set: "",
    condition: "",
    price: "",
  });

  const columns: ColumnDef<Card>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: (info) => <span className="font-medium">{info.getValue() as string}</span>,
    },
    { accessorKey: "set", header: "Set" },
    { accessorKey: "condition", header: "Condition" },
    {
      accessorKey: "price",
      header: "Price",
      cell: (info) => `£${info.getValue()}`,
    },
    {
      accessorKey: "created_at",
      header: "Added",
      cell: (info) => new Date(info.getValue() as string).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setEditingCard(row.original);
                setForm({
                  name: row.original.name,
                  set: row.original.set,
                  condition: row.original.condition,
                  price: String(row.original.price),
                });
                setViewMode(true);
                setModalOpen(true);
              }}
            >
              View
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setEditingCard(row.original);
                setForm({
                  name: row.original.name,
                  set: row.original.set,
                  condition: row.original.condition,
                  price: String(row.original.price),
                });
                setViewMode(false);
                setModalOpen(true);
              }}
            >
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleDelete(row.original.id)}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  useEffect(() => {
    fetchCards();
  }, [supabase, session]);

  async function fetchCards() {
    const { data } = await supabase
      .from("cards")
      .select("*")
      .eq("user_id", session?.user.id);
    if (data) setCards(data);
  }

  const handleSave = async () => {
    if (!form.name || !form.set || !form.condition || !form.price) return;

    if (editingCard) {
      await supabase
        .from("cards")
        .update({
          name: form.name,
          set: form.set,
          condition: form.condition,
          price: Number(form.price),
        })
        .eq("id", editingCard.id);
    } else {
      await supabase.from("cards").insert([
        {
          ...form,
          price: Number(form.price),
          user_id: session?.user.id,
        },
      ]);
    }

    setModalOpen(false);
    setForm({ name: "", set: "", condition: "", price: "" });
    setEditingCard(null);
    fetchCards();
  };

  const handleDelete = async (id: number) => {
    await supabase.from("cards").delete().eq("id", id);
    fetchCards();
  };

  const table = useReactTable({
    data: cards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: { globalFilter: search },
    onGlobalFilterChange: setSearch,
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-indigo-600">Pokémon Inventory</h1>
        <Button
          onClick={() => {
            setEditingCard(null);
            setForm({ name: "", set: "", condition: "", price: "" });
            setViewMode(false);
            setModalOpen(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" /> Add Card
        </Button>
      </div>

      <Input
        placeholder="Search cards..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <div className="rounded-md border dark:border-zinc-800 overflow-x-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between pt-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm text-zinc-500">
          Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 space-y-4"
          >
            <DialogHeader>
              <DialogTitle>{viewMode ? "View Card" : editingCard ? "Edit Card" : "Add Card"}</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSave();
              }}
              className="space-y-3"
            >
              <Input
                ref={nameRef}
                autoFocus
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                readOnly={viewMode}
              />
              <Input
                placeholder="Set"
                value={form.set}
                onChange={(e) => setForm({ ...form, set: e.target.value })}
                required
                readOnly={viewMode}
              />
              <Input
                placeholder="Condition"
                value={form.condition}
                onChange={(e) => setForm({ ...form, condition: e.target.value })}
                required
                readOnly={viewMode}
              />
              <Input
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
                required
                readOnly={viewMode}
              />
              {!viewMode && (
                <Button type="submit" className="w-full">
                  {editingCard ? "Save Changes" : "Add Card"}
                </Button>
              )}
            </form>
          </motion.div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
