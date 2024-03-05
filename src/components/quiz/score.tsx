import {useScoreContext} from "../context/scoreContext.tsx";
import {Button} from "@nextui-org/react";
import {useNavigate} from "react-router";


const Score = () => {
    const navigate = useNavigate()
    const {score, setScore} = useScoreContext()
    const handleNavigate = () => {
        navigate('/')
        setScore(0)
    }
    return (
        <section className='w-full h-[100vh] flex-col items-center justify-center flex text-[10vw] bg-[#1C1C1C] text-[#DBDBDB]  '>
            <h1 className='text-[4vw]'>Score</h1>
            <h1>{score}</h1>
            <Button size='sm' className=' bg-[#37996B] font-[400] text-[#FFFFFF] border border-[#3DCF8E]' onClick={handleNavigate}>
                Play again?
            </Button>
        </section>
    );
}

export default Score;