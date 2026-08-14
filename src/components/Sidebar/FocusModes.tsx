import {
GraduationCap,
Globe,
CirclePlay,
Image,
Video
} from "lucide-react";

import { PenLine } from "lucide-react";
import { useNavigate } from "react-router-dom";



const modes = [
  {
    name: "Academic",
    icon: GraduationCap,
    path: "/chat",
  },
  {
    name: "Web",
    icon: Globe,
    path: "/search",
  },
  {
    name: "Reddit",
    icon: CirclePlay,
    path: "/search",
  },
  {
    name: "Youtube",
    icon: CirclePlay,
    path: "/search",
  },
  {
    name: "Images",
    icon: Image,
    path: "/search",
  },
  {
    name: "Videos",
    icon: Video,
    path: "/search",
  },

  {
    name: "Writing",
    icon: PenLine,
    path: "/writing",
  },
];

const FocusModes=()=>{

  const navigate = useNavigate();

    return (<div className="space-y-1"> {
        modes.map((mode)=>{

            const Icon=mode.icon;

            return (

                <button

                key={mode.name}
                onClick={() => navigate(mode.path)}

                className={`
                w-full
                flex
                items-center
                gap-3
                px-3
                py-2
                rounded-lg
                text-sm
                transition

                ${mode.name?
                "bg-blue-500/10 text-blue-400"
                :
                "hover:bg-white/5 text-gray-400"
                }

                `}

                >

                <Icon size={17}/>

                <span>{mode.name}</span>

                </button>

            );


        })
    }    
    </div>
    );

};

export default FocusModes;