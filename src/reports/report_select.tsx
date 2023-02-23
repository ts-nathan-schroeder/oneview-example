import { MenuItem, Select } from "@mui/material"
import { useEffect,useState } from "react"

export default function ReportSelectMenu(props: { selectAnswer: any }){
    const {
        selectAnswer
    } = props

    const [answers,setAnswers] = useState<any[]>([])


    useEffect(()=>{
        var baseURL = "https://se-thoughtspot-cloud.thoughtspot.cloud/"
        fetch(baseURL+"callosum/v1/tspublic/v1/metadata/list?type=QUESTION_ANSWER_BOOK&category=MY",
        {
          credentials: 'include',
        })
        .then(response => response.json())
        .then(data => {
            if (data.headers){
                setAnswers(data.headers)
            }
        })
    },[])
    


    return (
        <Select 
            style={{width:'200px'}}
            label="Select Answer"
            onChange={(e)=>selectAnswer(e.target.value)}
        >
            {answers.map((answer)=>{
                return <MenuItem value={answer.id}>{answer.name}</MenuItem>
            })}
        </Select>
    )
}


