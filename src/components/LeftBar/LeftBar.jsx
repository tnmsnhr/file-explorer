import React, { useState } from 'react'
import "./leftBar.css"
import Folder from '../FolderView/Folder'
import { files } from '../../data/folderData'

const LeftBar = () => {
  const [folderData, setFolderData] = useState(files)

  const handleCreateDocument = (name, type, id) => {
    console.log(name, type, id)
  }

  return (
    <section className="leftBar">
      <Folder folderData={folderData} createDocument={handleCreateDocument} />
    </section>
  )
}

export default LeftBar