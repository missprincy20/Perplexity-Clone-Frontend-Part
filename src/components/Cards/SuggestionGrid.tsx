import { motion } from "framer-motion";
import {
  Search,
  FileText,
  Code2,
  Lightbulb,
  PenLine,
  GraduationCap,
} from "lucide-react";

import SuggestionCard from "./SuggestionCard";


interface SuggestionGridProps {
  onSelect?: (prompt: string) => void;
}


const suggestions = [
  {
    title: "Research anything",
    description:
      "Search, analyze and get detailed AI powered answers.",
    icon: <Search size={20} />,
    prompt:
      "Research and explain this topic in detail",
  },

  {
    title: "Summarize documents",
    description:
      "Extract key points from PDFs and long text.",
    icon: <FileText size={20} />,
    prompt:
      "Summarize this document",
  },

  {
    title: "Generate code",
    description:
      "Build, debug and explain programming solutions.",
    icon: <Code2 size={20} />,
    prompt:
      "Help me write code",
  },

  {
    title: "Learn concepts",
    description:
      "Understand difficult topics with simple explanations.",
    icon: <GraduationCap size={20} />,
    prompt:
      "Explain this concept simply",
  },

  {
    title: "Write something",
    description:
      "Create blogs, emails, reports and content.",
    icon: <PenLine size={20} />,
    prompt:
      "Help me write something",
  },

  {
    title: "Brainstorm ideas",
    description:
      "Generate creative ideas and solutions.",
    icon: <Lightbulb size={20} />,
    prompt:
      "Give me creative ideas",
  },
];


export default function SuggestionGrid({
  onSelect,
}: SuggestionGridProps) {

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: {
          transition:{
            staggerChildren:0.08,
          }
        }
      }}
      className="
      grid
      w-full
      grid-cols-1
      gap-4
      sm:grid-cols-2
      lg:grid-cols-3
      "
    >

      {suggestions.map((item)=>(
        
        <motion.div
          key={item.title}
          variants={{
            hidden:{
              opacity:0,
              y:20,
            },
            visible:{
              opacity:1,
              y:0,
            }
          }}
        >

          <SuggestionCard
            title={item.title}
            description={item.description}
            icon={item.icon}
            onClick={() =>
              onSelect?.(item.prompt)
            }
          />

        </motion.div>

      ))}


    </motion.div>
  );
}