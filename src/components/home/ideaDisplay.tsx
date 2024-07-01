import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

const IdeaDisplay: React.FC<IdeaType> = ({ideas}) => {
  return (
    <div className="grid grid-cols-3 gap-y-8 col-span-8 p-20 justify-between">
      {ideas.map((ideas) => {
              return (
                <Card key={ideas.id} className="w-[450px] h-[250px]">
                  <CardHeader>
                    <CardTitle>{ideas.title}</CardTitle>
                  </CardHeader>
                  <CardContent> 
                       <p>{ideas.description}</p>
                  </CardContent>
                </Card>
              )
            })}
       </div>  
  )
}

export default IdeaDisplay