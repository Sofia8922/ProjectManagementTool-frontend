import {
    animate,
    motion,
    MotionValue,
    useMotionValue,
    useMotionValueEvent,
    useScroll,
} from "motion/react"
import { useRef } from "react"
import { Card } from "react-bootstrap"

export default function ScrollLinkedTasks({ data }) {
    const ref = useRef(null)
    const { scrollXProgress } = useScroll({ container: ref })
    const maskImage = useScrollOverflowMask(scrollXProgress)

    // if (data.length == 0) {
    //     return (
    //         <motion.ul ref={ref} style={{ maskImage }}>
    //             <Card>
    //                 no data available
    //             </Card>
    //         </motion.ul>
    //     )
    // }

    return (
        <div id="example">
            {/* <svg id="progress" width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" pathLength="1" className="bg" />
                <motion.circle
                    cx="50"
                    cy="50"
                    r="30"
                    className="indicator"
                    style={{ pathLength: scrollXProgress }}
                />
            </svg> */}
            <motion.ul ref={ref} style={{ maskImage }}>

                {data.map(info =>
                <Card id="example2">
                    <li key={info.id} >
                        {info.name}
                        <br/>
                        {info.content}
                        <br/>
                        {info.status}
                        <br/>
                        {info.tags}
                    </li>
                    </Card>
                )}
            </motion.ul>
            <StyleSheet />
        </div>
    )
}

//   id: number;
//   name: string;
//   content: string;
//   status: string;
//   project: ProjectShortDTO;
//   comments: CommentShortDTO[];
//   creator: AccountShortDTO;
//   tags: TagDTO[];
//   assignedDevelopers: AccountShortDTO[];

const left = `0%`
const right = `100%`
const leftInset = `5%`
const rightInset = `95%`
const transparent = `#0000`
const opaque = `#000`

function useScrollOverflowMask(scrollXProgress: MotionValue<number>) {
    const maskImage = useMotionValue(
        `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
    )

    useMotionValueEvent(scrollXProgress, "change", (value) => {
        if (value === 0) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${opaque}, ${opaque} ${left}, ${opaque} ${rightInset}, ${transparent})`
            )
        } else if (value === 1) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${right}, ${opaque})`
            )
        } else if (
            scrollXProgress.getPrevious() === 0 ||
            scrollXProgress.getPrevious() === 1
        ) {
            animate(
                maskImage,
                `linear-gradient(90deg, ${transparent}, ${opaque} ${leftInset}, ${opaque} ${rightInset}, ${transparent})`
            )
        }
    })

    return maskImage
}

function StyleSheet() {
    return (
        <style>{`
            #example {
              width: 40vw;
              max-width: 1000%;
              min-width: 20%;
              position: relative;
            }
              
            #example2 {
              width: 35vw;
              max-width: 35%;
              min-width: 30%;
              position: relative;
            }

            #example #progress {
                position: absolute;
                top: -65px;
                left: -15px;
                transform: rotate(-90deg);
            }

            #example .bg {
                stroke: #0b1011;
            }

            #example #progress circle {
                stroke-dashoffset: 0;
                stroke-width: 10%;
                fill: none;
            }

            #progress .indicator {
                stroke: var(--accent);
            }

            #example ul {
                display: flex;
                list-style: none;
                height: 280px;
                overflow-x: scroll;
                padding: 10px 0;
                flex: 0 0 600px;
                margin: 0 auto;
                gap: 15px;
            }

            #example ::-webkit-scrollbar {
                height: 10px;
                width: 1px;
                background: rgba(0, 0, 0, 1);
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-thumb {
                background: var(--accent);
                -webkit-border-radius: 1ex;
            }

            #example ::-webkit-scrollbar-corner {
                background: #fff3;
            }

            #example li {
                flex: 0 0 200px;
                background: var(--accent);
            }

    `}</style>
    )
}