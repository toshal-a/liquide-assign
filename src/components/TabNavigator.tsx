import React from 'react'
import { data } from '../data/chartData'
import AnimatedLineGraph from './AnimatedLineGraph'
import TabChildren from './TabChildren'
import { TabProvider } from './TabProvider'

const TabNavigator = () => {
  return (
    <TabProvider>
      {
        Object.entries(data).map(([key, value]) => {
          return (
            <TabChildren
              key={key}
              tabName={key} 
              points={value.points}
              secondPathColor={value.secondPathColor}
              component={
                  AnimatedLineGraph
              }
            />
          )
        })
      }
    </TabProvider>
  )
}

export default TabNavigator