import { useLocation } from "react-router-dom";
import { EpisodeData, PodcastData } from "..";
import { useEffect, useState } from "react";
import * as icons from "../Icons"
import { parseXML } from "../utils";
import EpisodeCard from "../components/EpisodeCard";


function PodcastPreview({play}: {play: (episode?: EpisodeData) => void}) {
  const location = useLocation();
  const [imageError, setImageError] = useState(false)
  const podcast = location.state.podcast as PodcastData
  const [episodes, setEpisodes] = useState<EpisodeData[]>([])


  useEffect(()=>{
    parseXML(podcast.feedUrl).then(result => {
      setEpisodes(result)
    })
  }, [podcast])


  return (
    <div className="p-2 w-full flex flex-col">
      <div className='flex justify-left w-full gap-3 bg-zinc-800 rounded-md mb-2'>
        {imageError ?
          icons.photo :
          <img
            className="bg-zinc-700 h-40 aspect-square rounded-md"
            src={podcast.coverUrlLarge}
            onError={() => setImageError(true)}
          />
        }

        <div className="flex flex-col">
          <h1>{podcast.podcastName}</h1>
          <h2>{podcast.artistName}</h2>
        </div>
      </div>

      <div className="flex-1">
        <div className="grid gap-1">
          {
            episodes.map(episode => {
              return (
                <EpisodeCard episode={episode} podcast={podcast}
                  play={() => {
                          play(episode)
                        }}/>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PodcastPreview;