
import React, { useEffect, useRef } from "react";
import { tools } from "@/data/tools";
import ToolCard from "@/components/ToolCard";
import { motion } from "framer-motion";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const parentVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <div className="space-y-8 max-w-screen-2xl mx-auto">
      <section className="text-center space-y-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl font-bold tracking-tight">
            Smart<span className="text-primary">Toolkit</span>
          </h1>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
            A collection of beautifully designed tools to simplify your daily tasks
          </p>
        </motion.div>
      </section>

      <motion.div
        ref={containerRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        variants={parentVariants}
        initial="hidden"
        animate="visible"
      >
        {tools.map((tool) => (
          <motion.div key={tool.id} variants={childVariants}>
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Index;
