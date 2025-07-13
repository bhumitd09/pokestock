import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const sprites = [
  "/sprites/pikachu.gif",
  "/sprites/eevee.gif",
  "/sprites/bulbasaur.gif",
  "/sprites/squirtle.gif",
  "/sprites/charizard.gif",
];

export default function LoadingScreen() {
  const [sprite, setSprite] = useState(sprites[0]);

  useEffect(() => {
    const random = Math.floor(Math.random() * sprites.length);
    setSprite(sprites[random]);
  }, []);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black text-white z-50">
      <motion.img
        src={sprite}
        alt="Loading Pokémon"
        className="w-32 h-32 mb-6"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <h1 className="text-2xl font-bold">Signing you in...</h1>
      <p className="text-sm text-white/70 mt-2">Please wait ⏳</p>
    </div>
  );
}
