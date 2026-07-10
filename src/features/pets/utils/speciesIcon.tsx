import React from "react";
import {
  Dog,
  Cat,
  Bird,
  Rabbit,
  PiggyBank,
  PawPrint,
} from "lucide-react";

export const getSpeciesIcon = (especie?: string | null, className: string = "h-6 w-6") => {
  switch (especie) {
    case "Cachorro":
      return <Dog className={className} />;
    case "Gato":
      return <Cat className={className} />;
    case "Pássaro":
      return <Bird className={className} />;
    case "Coelho":
      return <Rabbit className={className} />;
    case "Porquinho da Índia":
      return <PiggyBank className={className} />;
    default:
      return <PawPrint className={className} />;
  }
};
