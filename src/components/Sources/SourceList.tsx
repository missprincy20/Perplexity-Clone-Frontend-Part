import { motion } from "framer-motion";
import SourceCard from "./SourceCard";
import { SearchX } from "lucide-react";


interface Source {
  title: string;
  url: string;
  snippet?: string;
  sourceType?: string;
  date?: string;
  relevance?: number;
  favicon?: string;
}


interface SourceListProps {

  sources: Source[];

  loading?: boolean;

}



export default function SourceList({

  sources,

  loading = false,

}: SourceListProps) {



  // Loading Skeleton

  if (loading) {

    return (

      <div className="space-y-4">


        {[1,2,3].map((item)=>(

          <div

            key={item}

            className="
            h-48
            rounded-3xl
            border
            border-white/10
            bg-white/5
            animate-pulse
            "

          />

        ))}


      </div>

    );

  }





  // Empty State

  if (!sources.length) {

    return (

      <div

        className="
        flex
        flex-col
        items-center
        justify-center

        rounded-3xl

        border
        border-white/10

        bg-[#111113]

        py-12

        text-center
        "

      >

        <SearchX

          size={40}

          className="
          text-zinc-500
          "

        />


        <h3

          className="
          mt-4
          font-medium
          text-white
          "

        >

          No sources found

        </h3>


        <p

          className="
          mt-2
          text-sm
          text-zinc-500
          "

        >

          Sources will appear here after searching.

        </p>


      </div>

    );

  }





  return (

    <motion.div

      initial="hidden"

      animate="visible"

      variants={{

        hidden:{},

        visible:{

          transition:{

            staggerChildren:0.08

          }

        }

      }}

      className="

      space-y-4

      max-h-full

      overflow-y-auto

      pr-1

      "

    >



      {
        sources.map((source,index)=>(


          <motion.div

            key={`${source.title}-${index}`}

            variants={{

              hidden:{

                opacity:0,

                y:15

              },

              visible:{

                opacity:1,

                y:0

              }

            }}

          >


            <SourceCard

              index={index+1}

              title={source.title}

              url={source.url}

              snippet={source.snippet}

              sourceType={source.sourceType}

              date={source.date}

              relevance={source.relevance}

              favicon={source.favicon}

            />


          </motion.div>


        ))
      }




    </motion.div>

  );

}