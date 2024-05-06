import Icon from "../UI/Icon"
import "./folder.css"
import React, { useState, useEffect, useRef } from 'react'

const Folder = ({ folderData, createDocument }) => {
    const [isExpanded, setIsExpanded] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [createType, setCreateType] = useState(null)
    const idRef = useRef(null)
    const documentName = useRef("")

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showMenu && !event.target.closest('.popup-menu')) {
                setShowMenu(false);
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showMenu]);

    const handleRightClick = (e) => {
        e.preventDefault()
        setShowMenu(!showMenu)
        setCreateType(null)
        idRef.current = {
            name: folderData?.name,
            id: folderData?.id
        }
    }

    const handleChange = e => {
        documentName.current = e.target.value
    }

    const handleEnter = (e) => {
        if (e.key?.toLowerCase() == "enter") {
            createDocument(documentName.current, createType, idRef.current?.id)
            setCreateType(null)
        }
    }

    const createNewFile = (type) => {
        setCreateType(type)
        setIsExpanded(true)
    }

    if (folderData?.type == "folder") {
        return (
            <div style={{ position: "relative" }}>
                <div className="folder"
                    onClick={(e) => {
                        e.preventDefault()
                        setIsExpanded(prevState => !prevState)
                    }}
                    onContextMenu={(e) => handleRightClick(e,)}
                >
                    <div className="folderDetails">
                        <div className="iconName">
                            <Icon size={18} color="grey" icon="folder" />
                            <h3 className="folderLabel">{folderData?.name}</h3>
                        </div>
                        {isExpanded ?
                            <Icon size={18} color="grey" icon="chevron-down" /> :
                            <Icon size={18} color="grey" icon="chevron-right" />}
                    </div>
                </div>
                {createType && <div className="inputContainer subFolders">
                    {createType == "file" ?
                        <Icon size={18} color="grey" icon={"file"} />
                        :
                        <Icon size={18} color="grey" icon={"folder"} />
                    }
                    <input type="text" onBlur={() => { setCreateType(null) }} autoFocus onKeyDown={handleEnter} onChange={handleChange} />
                </div>}
                <div style={{ display: isExpanded ? "block" : "none" }}>
                    {folderData?.data?.map(item => (
                        <div className="subFolders" key={item?.id}>
                            <Folder folderData={item} createDocument={createDocument} />
                        </div>
                    ))}
                </div>
                {showMenu && <div className="popupMenu">
                    <ul className="popupMenuItems">
                        <li
                            className="popupMenuItem"
                            onClick={() => {
                                createNewFile("file")
                            }}
                        >Add File</li>
                        <li
                            className="popupMenuItem"
                            onClick={() => {
                                createNewFile("folder")
                            }}
                        >Add Folder</li>
                        <li className="popupMenuItem">Rename</li>
                        <li className="popupMenuItem">Copy</li>
                        <li className="popupMenuItem">Delete</li>
                    </ul>
                </div>}
            </div>
        )
    } else {
        return <>
            <div className="file">
                <div>
                    <div className="iconName">
                        <Icon size={18} color="grey" icon={folderData?.meta ?? "file"} />
                        <h3 className="folderLabel">{folderData?.name}</h3>
                    </div>
                </div>
            </div>
        </>
    }
}

export default Folder