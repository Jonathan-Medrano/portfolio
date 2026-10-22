import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { profile } from "@/data";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-5xl flex-col justify-center gap-6 px-6">
      <p className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        Error 404
      </p>
      <h1 className="font-heading text-5xl font-bold sm:text-6xl">
        Esta página no existe
      </h1>
      <p className="max-w-xl text-lg text-pretty text-muted-foreground">
        El link que seguiste no lleva a ningún lado. Todo lo que hay para ver
        de {profile.name} está en una sola página.
      </p>
      <div>
        <Button asChild size="lg">
          <Link to="/">Volver al inicio</Link>
        </Button>
      </div>
    </main>
  );
}
