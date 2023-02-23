

import { Box, Button, MenuItem, Select, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import { Action, EmbedEvent, HostEvent } from '@thoughtspot/visual-embed-sdk';
import { useEmbedRef, SearchEmbed } from'@thoughtspot/visual-embed-sdk/react';
import { useState } from 'react';
import ReportSelectMenu from './report_select';

const columns = [
    'Sales',
    'Store Region',
    'Average Basket Size',
    'Brand',
    'Age Group',
    'Gender'
]

export default function SearchApp(){

    const embedRef = useEmbedRef();

    const [selectedAnswer,setSelectedAnswer] = useState<string | undefined>(undefined)

    const [renderKey, setRenderKey] = useState<number>(0)
    
    const [selectedColumns, setSelectedColumns] = useState([])

    function selectAnswer(answerUUID: string){
        setSelectedAnswer(answerUUID)
    }

    function onEmbedRendered(){
        embedRef.current.on(EmbedEvent.Save, (data) => {
            console.log("saved!!",data)
            setRenderKey( Math.random())
        })
    }
    function toggleSelectedColumns(e:any){
        let selectedVal :any = e.target.value;
        setSelectedColumns(selectedVal)
    }
    function saveSearch(){
        embedRef.current.trigger(HostEvent.Save)
    }

    let searchString = ""
    for (var col of selectedColumns){
        searchString+="["+col+"] "
    }

    return (
        <Container>
            <Stack spacing={4}>
            <Typography align="left" variant="h5" component="h2">
                My Search App
            </Typography>
            <Stack direction="row" spacing={2}>
                <ReportSelectMenu  key={renderKey} selectAnswer={selectAnswer}></ReportSelectMenu>
                <Button onClick={()=>setSelectedAnswer(undefined)}>
                    New Search
                </Button>
                <Button onClick={saveSearch}>
                    Save Search
                </Button>
            </Stack>
            <Typography align="left" variant="subtitle1" component="h6">
                Select
            </Typography>
            <Stack direction="row" spacing={2}>
                <Select 
                    multiple={true}
                    value={selectedColumns}
                    label={"Select Column"}
                    onChange={toggleSelectedColumns}
                >
                    {columns.map((column)=>{
                        return <MenuItem value={column}>{column}</MenuItem>
                    })}
                </Select>
            </Stack>
            <Box height="60vh">
            <SearchEmbed 
                ref={embedRef} 
                answerId={selectedAnswer}
                //visibleActions={}
                //disabledActions={} 
                dataSources={["782b50d1-fe89-4fee-812f-b5f9eb0a552d"]} 
                searchOptions = {{
                    searchTokenString: searchString,
                    executeSearch: true,
                }}                  
                //visibleActions={[Action.AnswerChartSwitcher]}
                hideDataSources={true}
                forceTable={true}
                frameParams={{width:'100%',height:'100%'}}
            />
            </Box>
            </Stack>
        </Container>

    )
}