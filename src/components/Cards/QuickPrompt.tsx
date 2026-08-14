import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";


interface QuickPromptProps {
  prompts?: string[];
  onSelect?: (prompt:string)=>void;
}


const defaultPrompts = [
  "Explain AI in simple words",
  "Summarize this PDF",
  "Generate React code",
  "Explain machine learning",
  "Create a project idea",
  "Prepare interview questions",
];


export default function QuickPrompt({
  prompts = defaultPrompts,
  onSelect,
}:QuickPromptProps){

  return (

    <div
      className="
      flex
      flex-wrap
      justify-center
      gap-3
      "
    >

      {
        prompts.map((prompt,index)=>(

          <motion.button

            key={prompt}

            initial={{
              opacity:0,
              y:10
            }}

            animate={{
              opacity:1,
              y:0
            }}

            transition={{
              delay:index*0.05
            }}

            whileHover={{
              scale:1.05,
              y:-2
            }}

            whileTap={{
              scale:0.96
            }}

            onClick={()=>
              onSelect?.(prompt)
            }

            className="
            group
            flex
            items-center
            gap-2

            rounded-full

            border
            border-white/10

            bg-white/5

            px-4
            py-2

            text-sm

            text-zinc-300

            backdrop-blur-xl

            transition

            hover:border-blue-500/40

            hover:bg-blue-500/10

            hover:text-white
            "

          >

            <Sparkles
              size={14}
              className="
              text-blue-400
              group-hover:rotate-12
              transition
              "
            />


            {prompt}


          </motion.button>

        ))
      }


    </div>

  );
}