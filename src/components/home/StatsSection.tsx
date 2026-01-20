import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

const stats = [
  {
    value: 2700,
    suffix: "+",
    label: "Conversations",
    description: "Expert consultations provided",
  },
  {
    value: 5000,
    suffix: "+",
    label: "Happy Customers",
    description: "Debt-free families",
  },
  {
    value: 500,
    suffix: "Cr+",
    label: "Debt Handled",
    description: "Successfully settled",
  },
  {
    value: 98,
    suffix: "%",
    label: "Success Rate",
    description: "Cases resolved positively",
  },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 2,
      onUpdate: (v) => setDisplayValue(Math.round(v)),
    });
    return controls.stop;
  }, [value]);

  return (
    <span>
      {displayValue.toLocaleString('en-IN')}{suffix}
    </span>
  );
}

export function StatsSection() {
  return (
    <section className="py-10 xs:py-12 sm:py-16 lg:py-24 bg-primary">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6">
        <div className="flex flex-wrap justify-center gap-3 xs:gap-4 sm:gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center min-w-[70px] xs:min-w-[80px] sm:min-w-[100px]"
            >
              <div className="font-display text-xl xs:text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-primary-foreground mb-0.5 xs:mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-primary-foreground/90 font-medium mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base">
                {stat.label}
              </div>
              <div className="text-primary-foreground/60 text-xs sm:text-sm hidden sm:block">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
