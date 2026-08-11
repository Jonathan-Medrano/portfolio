import { motion } from "motion/react";
import { profile } from "@/data";

// The Nether: the bottom of the journey. Contact / final call to action.
export default function Nether() {
  return (
    <section className="cv-section relative flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-6 text-center">
      {/* Netherrack walls. */}
      <div
        className="tex absolute inset-0"
        style={{ backgroundImage: "url(/textures/mc/netherrack.png)", backgroundSize: "52px 52px" }}
      />
      <div className="absolute inset-0 [background:radial-gradient(ellipse_at_50%_40%,rgba(0,0,0,0.15)_0%,rgba(20,4,4,0.82)_100%)]" />
      {/* Lava glow rising from the floor. */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-orange-500/70 via-orange-600/25 to-transparent" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center gap-4"
      >
        <h2 className="font-mc text-lg leading-relaxed text-orange-300 drop-shadow-[3px_3px_0_rgba(0,0,0,0.7)] sm:text-2xl">
          El Nether — Contacto
        </h2>
        <p className="max-w-md text-sm text-red-100">
          Llegaste al fondo. Si te gustó el viaje, hablemos.
        </p>

        <div className="flex flex-wrap justify-center gap-3 pt-2">
          {profile.socials.map((social) => (
            <a
              key={social.kind}
              href={social.url}
              target="_blank"
              rel="noreferrer"
              className="border-4 px-5 py-3 font-mc text-[10px] tracking-widest text-white uppercase transition-transform hover:translate-y-px"
              style={{
                background: "#a23a1e",
                borderColor: "#d4622e #5e1d0c #5e1d0c #d4622e",
              }}
            >
              {social.label}
            </a>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
