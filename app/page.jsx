import { AllRecipes } from "@/components/AllRecipes";
import { IngredientSelect } from "@/components/IngredientSelect";

export default function Home() {
  return (
    <main className="container mx-auto p-8">
      hola mundo
      <IngredientSelect />
      <AllRecipes />
    </main>
  );
}
