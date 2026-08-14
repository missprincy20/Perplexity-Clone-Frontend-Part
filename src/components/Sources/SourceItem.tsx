import { motion } from "framer-motion";
import { ExternalLink, Globe } from "lucide-react";


interface SourceItemProps {
  title: string;
  url: string;
  description?: string;
  favicon?: string;
  onClick?: () => void;
}


export default function SourceItem({
  title,
  url,
  description,
  favicon,
  onClick,
}: SourceItemProps) {


  return (

    <motion.button

      onClick={onClick}

      whileHover={{
        y:-3,
      }}

      transition={{
        duration:0.2
      }}

      className="
      group
      w-full
      text-left

      rounded-2xl

      border
      border-white/10

      bg-[#111113]

      p-4

      backdrop-blur-xl

      transition

      hover:border-blue-500/40

      hover:bg-white/[0.04]

      "

    >

      <div
        className="
        flex
        gap-3
        items-start
        "
      >


        {/* Icon */}

        <div
          className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center

          rounded-xl

          bg-blue-500/10

          text-blue-400
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

              <Globe size={20}/>

            )
          }


        </div>



        {/* Content */}

        <div className="flex-1 min-w-0">


          <div
            className="
            flex
            items-center
            gap-2
            "
          >

            <h4
              className="
              truncate
              font-medium
              text-white
              "
            >
              {title}
            </h4>


            <ExternalLink

              size={14}

              className="
              text-zinc-500

              opacity-0

              transition

              group-hover:opacity-100

              "
            />

          </div>



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
            description && (

              <p
                className="
                mt-2
                line-clamp-2
                text-sm
                text-zinc-400
                "
              >

                {description}

              </p>

            )
          }



        </div>


      </div>


    </motion.button>

  );
}