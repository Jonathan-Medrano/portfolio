import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

// Sample series, not real listings: 40 days of one product's price. The price
// sits near $100.000, is pushed UP before the "sale", and the sale then looks
// like a big discount against the inflated number — exactly the trick the
// project exists to expose.
const SERIES = [
  100, 100, 99, 100, 101, 100, 98, 99, 100, 97, 96, 98, 99, 100, 100, 99, 97, 95,
  96, 98, 100, 101, 100, 99, 98, 99, 100, 112, 124, 135, 140, 140, 140, 140, 140,
  140, 140, 140, 140, 140,
].map((thousands) => thousands * 1000);

const MIN_PRICE = 60_000;
const MAX_PRICE = 150_000;
const W = 640;
const H = 220;
const PAD = { top: 16, right: 16, bottom: 28, left: 56 };

const money = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(value);

function x(index: number, total: number) {
  return PAD.left + (index / (total - 1)) * (W - PAD.left - PAD.right);
}
function y(price: number) {
  return (
    PAD.top +
    (1 - (price - MIN_PRICE) / (MAX_PRICE - MIN_PRICE)) *
      (H - PAD.top - PAD.bottom)
  );
}

/**
 * The rule at the heart of Bajó el Precio, made touchable. A listing says
 * "40% OFF"; the only honest comparison is against the whole recorded series.
 * Drag the price: the alert fires only if it beats the historic minimum — and
 * the claimed discount, measured against the inflated price, is shown beside it
 * so the gap between the two is visible.
 */
export default function PriceHistoryDemo() {
  const [price, setPrice] = useState(84_000);

  const { historicMin, listPrice, claimedDiscount, realChange, isRealDrop } =
    useMemo(() => {
      const min = Math.min(...SERIES);
      const list = SERIES[SERIES.length - 1];
      const typical = SERIES[0];
      return {
        historicMin: min,
        listPrice: list,
        claimedDiscount: Math.round((1 - price / list) * 100),
        realChange: Math.round((price / typical - 1) * 100),
        isRealDrop: price < min,
      };
    }, [price]);

  const points = SERIES.map((p, i) => `${x(i, SERIES.length)},${y(p)}`).join(" ");
  const gridPrices = [60_000, 90_000, 120_000, 150_000];

  return (
    <div className="flex min-w-0 flex-col gap-4 border-t border-border pt-5">
      <div className="flex flex-col gap-1">
        <h4 className="font-heading text-lg font-semibold">
          Probá la regla: ¿baja real o descuento inflado?
        </h4>
        <p className="text-sm text-pretty text-muted-foreground">
          Datos de muestra, no de una publicación real. La publicación subió
          el precio antes de la oferta; mové el precio de oferta y mirá cuándo
          el sistema avisaría.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          role="img"
          aria-label="Gráfico de 40 días: el precio ronda 100.000 pesos y sube a 140.000 antes de la oferta"
          className="w-full rounded-lg border border-border bg-muted/40"
        >
          {gridPrices.map((g) => (
            <g key={g}>
              <line
                x1={PAD.left}
                x2={W - PAD.right}
                y1={y(g)}
                y2={y(g)}
                className="stroke-border"
                strokeDasharray="3 4"
              />
              <text
                x={PAD.left - 8}
                y={y(g) + 4}
                textAnchor="end"
                className="fill-muted-foreground text-[13px]"
              >
                {`$${g / 1000}k`}
              </text>
            </g>
          ))}

          {/* Historic minimum: the line the new price has to cross. */}
          <line
            x1={PAD.left}
            x2={W - PAD.right}
            y1={y(historicMin)}
            y2={y(historicMin)}
            className="stroke-emerald-500"
            strokeWidth={1.5}
            strokeDasharray="6 4"
          />
          <text
            x={W - PAD.right}
            y={y(historicMin) + 15}
            textAnchor="end"
            className="fill-emerald-600 text-[13px] font-medium dark:fill-emerald-400"
          >
            Mínimo histórico {money(historicMin)}
          </text>

          <polyline
            points={points}
            fill="none"
            className="stroke-foreground"
            strokeWidth={2}
            strokeLinejoin="round"
          />

          {/* The offer price, as a ring at the right edge. */}
          <line
            x1={W - PAD.right}
            x2={W - PAD.right}
            y1={y(listPrice)}
            y2={y(price)}
            className="stroke-muted-foreground"
            strokeDasharray="2 3"
          />
          <circle
            cx={W - PAD.right}
            cy={y(price)}
            r={6}
            className={cn(
              "stroke-background",
              isRealDrop ? "fill-emerald-500" : "fill-amber-500",
            )}
            strokeWidth={2}
          />
          <text
            x={PAD.left}
            y={H - 8}
            className="fill-muted-foreground text-[13px]"
          >
            hace 40 días
          </text>
          <text
            x={W - PAD.right}
            y={H - 8}
            textAnchor="end"
            className="fill-muted-foreground text-[13px]"
          >
            hoy
          </text>
        </svg>

        <div className="flex min-w-0 flex-col gap-4">
          <label className="flex flex-col gap-2 text-sm">
            <span className="flex items-baseline justify-between">
              <span className="text-muted-foreground">Precio de oferta</span>
              <span className="font-heading text-xl font-bold">
                {money(price)}
              </span>
            </span>
            <input
              type="range"
              min={MIN_PRICE}
              max={MAX_PRICE}
              step={1000}
              value={price}
              onChange={(event) => setPrice(Number(event.target.value))}
              className="w-full accent-foreground"
            />
          </label>

          <dl className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md border border-border px-3 py-2">
              <dt className="text-xs text-muted-foreground">
                Dice la publicación
              </dt>
              <dd className="font-semibold">
                {claimedDiscount > 0 ? `${claimedDiscount}% OFF` : "sin descuento"}
              </dd>
            </div>
            <div className="rounded-md border border-border px-3 py-2">
              <dt className="text-xs text-muted-foreground">
                Contra el precio de siempre
              </dt>
              <dd className="font-semibold">
                {realChange === 0
                  ? "igual"
                  : realChange < 0
                    ? `${Math.abs(realChange)}% más barato`
                    : `${realChange}% más caro`}
              </dd>
            </div>
          </dl>

          <p
            role="status"
            className={cn(
              "rounded-md border px-4 py-3 text-sm font-medium text-pretty",
              isRealDrop
                ? "border-emerald-500/50 bg-emerald-500/10"
                : "border-amber-500/50 bg-amber-500/10",
            )}
          >
            {isRealDrop
              ? "Mínimo histórico real: el bot avisa al canal."
              : "No supera el mínimo histórico: el bot no avisa. El descuento se mide contra un precio inflado."}
          </p>
        </div>
      </div>
    </div>
  );
}
