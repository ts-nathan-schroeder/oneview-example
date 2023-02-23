

import { Box, Button, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
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
export default function SearchApp(props: { tsURL: string; }){
    const {
        tsURL
    } = props

    const embedRef = useEmbedRef();

    const [selectedAnswer,setSelectedAnswer] = useState<string | undefined>(undefined)

    const [renderKey, setRenderKey] = useState<number>(0)
    
    const [selectedColumns, setSelectedColumns] = useState([])

    function selectAnswer(answerUUID: string){
        setSelectedColumns([])
        setSelectedAnswer(answerUUID)
    }
    function onEmbedRendered(){
        embedRef.current.on(EmbedEvent.Save, (data) => {
            setRenderKey( Math.random())
        })
    }
    function toggleSelectedColumns(e:any){
        setSelectedAnswer(undefined)
        let selectedVal :any = e.target.value;
        setSelectedColumns(selectedVal)
    }
    function saveSearch(){
        embedRef.current.trigger(HostEvent.Save)
    }
    function exportPDF(){
        fetch(tsURL+"api/rest/2.0/report/answer",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({metadata_identifier: selectedAnswer}),
            credentials: 'include',
        })
        .then(response => response.text())
        .then((data)=>{
            let csvContent = "data:text/csv;charset=utf-8," + data
            var encodedUri = encodeURI(csvContent);
            window.open(encodedUri);
        })
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
                <Button onClick={exportPDF}>
                    Export
                </Button>
            </Stack>

            <Stack direction="row" spacing={2}>
                    <FormControl>
                    <InputLabel id="demo-simple-select-label">Columns</InputLabel>
                    <Select 
                        style={{width:'200px'}}
                        multiple={true}
                        value={selectedColumns}
                        label={"Select Column"}
                        onChange={toggleSelectedColumns}
                    >
                        {columns.map((column)=>{
                            return <MenuItem value={column}>{column}</MenuItem>
                        })}
                    </Select>
                </FormControl>

            </Stack>
            <Box height="60vh">
            <SearchEmbed 
                ref={embedRef} 
                answerId={selectedAnswer}
                //visibleActions={}
                //disabledActions={} 
                onLoad={onEmbedRendered}
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