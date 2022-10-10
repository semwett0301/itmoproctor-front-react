import { Card } from '@consta/uikit/Card'
import React, { FC, useState } from 'react'
import { Collapse } from '@consta/uikit/Collapse'
import { NavLink } from 'react-router-dom'
import { collapseItems, ICollapseItem } from './NavCollapseModel'
import cl from './NavCollapse.module.scss'
import { classWatcher } from '../../../../utils/styleClassesUtills'
import { TabItem } from '../../Admin'

interface NavCollapseProps {
   isOpen: boolean
   addTab: (item: TabItem) => void
}

const NavCollapse: FC<NavCollapseProps> = ({ isOpen, addTab }) => {
   const [collapseState, setCollapseState] = useState<boolean>(false)

   const navMaker = (item: ICollapseItem, key: string): JSX.Element => {
      if (!item.children) {
         return (
            <NavLink
               to={item.path}
               className={cl.link}
               key={key}
               onClick={() => {
                  addTab({ id: key, title: item.title, path: item.path, type: 'tab' })
               }}
            >
               <Card
                  horizontalSpace='xs'
                  verticalSpace='s'
                  shadow={false}
                  className={cl.linkContent}
               >
                  <div
                     className={classWatcher(isOpen, cl.expandIcon, cl.collapsedIcon, cl.linkIcon)}
                  >
                     <item.icon size='s' />
                  </div>
                  {item.title}
               </Card>
            </NavLink>
         )
      }

      // if (item.children) {
      else {
         return (
            <Card
               key={key}
               horizontalSpace='xs'
               verticalSpace='s'
               form='square'
               shadow={false}
               className={cl.collapseContent}
            >
               <div
                  className={classWatcher(isOpen, cl.expandIcon, cl.collapsedIcon, cl.collapseIcon)}
               >
                  <item.icon size='s' />
               </div>

               <Collapse
                  label={item.title}
                  isOpen={collapseState}
                  onClick={() => setCollapseState(!collapseState)}
                  iconPosition={'right'}
                  className={cl.collapse}
               >
                  {item.children.map((value) => (
                     <NavLink to={value.path} className={cl.collapseLink} key={value.title}>
                        <Card shadow={false} className={cl.linkContent}>
                           <div className={cl.linkIcon}>
                              <value.icon size='xs' />
                           </div>
                           {value.title}
                        </Card>
                     </NavLink>
                  ))}
               </Collapse>
            </Card>
         )
      }
   }

   return (
      <div className={cl.navWrapper}>{collapseItems.map((item) => navMaker(item, item.path))}</div>
   )
}

export default NavCollapse
