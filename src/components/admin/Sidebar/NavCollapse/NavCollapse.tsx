import {Card} from '@consta/uikit/Card'
import React, {FC, useState} from 'react'
import {Collapse} from '@consta/uikit/Collapse'
import {getSidebarItems, ICollapseItem} from './NavCollapseModel'
import cl from './NavCollapse.module.scss'
import {classJoiner, classWatcher} from '../../../../utils/common/styleClassesUtills'
import {TabItem} from '../../../shared/NavTabs/NavTabs';

interface NavCollapseProps {
  isOpen: boolean
  addTab: (item: TabItem) => void
}

const NavCollapse: FC<NavCollapseProps> = ({ isOpen, addTab }) => {
  const [collapseState, setCollapseState] = useState<boolean>(false)
  const navMaker = (item: ICollapseItem, key: string): JSX.Element => {
    if (!item.children) {
      return (
        <div
          className={cl.link}
          key={item.title + item.path}
          onClick={() => {
            addTab({ id: key, title: item.title, path: item.path, type: 'tab' })
          }}
        >
          <div className={cl.linkIcon}>
            <item.icon size='s' />
          </div>
          {item.title}
        </div>
      )
    } else {
      return (
        <Card key={item.path} form='square' shadow={false} className={cl.collapseContent}>
          <div
            className={classWatcher(
              collapseState,
              cl.activeCollapseIcon,
              cl.disabledCollapseIcon,
              cl.collapseIcon
            )}
            onClick={() => setCollapseState(!collapseState)}
          >
            <item.icon size='s' />
          </div>

          <div style={{ position: 'relative' }}>
            <Collapse
              label={item.title}
              isOpen={collapseState}
              onClick={() => setCollapseState(!collapseState)}
              iconPosition={'right'}
              className={cl.collapse}
            >
              <div
                className={classWatcher(
                  isOpen,
                  cl.disabledCollapseMenu,
                  cl.activeCollapseMenu,
                  cl.collapseMenu
                )}
              >
                {item.children.map((value) => (
                  <div className={classJoiner(cl.link, cl.collapseLink)} key={value.title}>
                    <div className={isOpen ? cl.wideCollapseLinkIcon : cl.collapseLinkIcon}>
                      <value.icon size='xs' />
                    </div>
                    {value.title}
                  </div>
                ))}
              </div>
            </Collapse>
          </div>
        </Card>
      )
    }
  }

  return (
    <div className={cl.navWrapper}>
      {getSidebarItems().map((item) => navMaker(item, item.path))}
    </div>
  )
}

export default NavCollapse
