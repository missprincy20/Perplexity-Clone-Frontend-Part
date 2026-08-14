import { motion } from "framer-motion";
import {
  ExternalLink,
  Globe,
  CalendarDays,
  Sparkles,
} from "lucide-react";


interface SourceCardProps {
  index?: number;
  title: string;
  url: string;
  snippet?: string;
  sourceType?: string;
  date?: string;
  relevance?: number;
  favicon?: string;
}


export default function SourceCard({
  index,
  title,
  url,
  snippet,
  sourceType = "Web Source",
  date,
  relevance,
  favicon,
}: SourceCardProps) {


  return (

    <motion.div

      initial={{
        opacity:0,
        y:15
      }}

      animate={{
        opacity:1,
        y:0
      }}

      transition={{
        duration:0.25
      }}

      whileHover={{
        y:-4
      }}

      className="
      group

      rounded-3xl

      border
      border-white/10

      bg-[#111113]

      p-5

      backdrop-blur-xl

      shadow-lg

      hover:border-blue-500/40

      transition
      "

    >


      {/* Header */}

      <div
        className="
        flex
        items-start
        justify-between
        "
      >


        <div
          className="
          flex
          gap-3
          "
        >


          {/* Citation Number */}

          <div
            className="
            flex
            h-8
            w-8
            items-center
            justify-center

            rounded-full

            bg-blue-500/10

            text-sm

            font-semibold

            text-blue-400
            "
          >

            {index ?? 1}

          </div>



          {/* Favicon */}

          <div
            className="
            flex
            h-10
            w-10
            items-center
            justify-center

            rounded-xl

            bg-white/5

            "
          >

            {
              favicon ? (

                <img
                  src={favicon}
                  alt=""
                  className="
                  h-6
                  w-6
                  rounded
                  "
                />

              ):(

                <Globe
                  size={20}
                  className="text-blue-400"
                />

              )
            }


          </div>


        </div>



        {/* Open */}

        <button

          className="
          rounded-xl

          p-2

          text-zinc-400

          transition

          hover:bg-white/5

          hover:text-blue-400

          "

        >

          <ExternalLink size={17}/>

        </button>


      </div>




      {/* Content */}


      <div className="mt-4">


        <h3
          className="
          line-clamp-2

          text-base

          font-semibold

          text-white
          "
        >

          {title}

        </h3>



        <p
          className="
          mt-1

          truncate

          text-xs

          text-blue-400
          "
        >

          {url}

        </p>



        {
          snippet && (

            <p
              className="
              mt-3

              line-clamp-3

              text-sm

              leading-6

              text-zinc-400
              "
            >

              {snippet}

            </p>

          )
        }


      </div>





      {/* Footer */}

      <div
        className="
        mt-5

        flex

        flex-wrap

        items-center

        gap-3

        "
      >


        {/* Type */}

        <span
          className="
          flex
          items-center
          gap-1

          rounded-full

          bg-white/5

          px-3

          py-1

          text-xs

          text-zinc-300
          "
        >

          <Sparkles size={12}/>

          {sourceType}

        </span>




        {/* Date */}

        {
          date && (

            <span
              className="
              flex
              items-center
              gap-1

              rounded-full

              bg-white/5

              px-3

              py-1

              text-xs

              text-zinc-400
              "
            >

              <CalendarDays size={12}/>

              {date}

            </span>

          )
        }





        {/* Relevance */}

        {
          relevance && (

            <span
              className="
              rounded-full

              bg-blue-500/10

              px-3

              py-1

              text-xs

              text-blue-400
              "
            >

              {relevance}% match

            </span>

          )
        }


      </div>


    </motion.div>

  );
}