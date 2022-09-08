import Header from "../../components/header/header";
import NewList from "../../components/NewList/NewList";
import CreatedList from "../../components/CreatedList/CreatedList";
import { useState } from "react";
import "./Lists.styles.css";
import { BsFillPersonFill, BsFillPeopleFill } from "react-icons/bs";
import Loading from "../../components/Loading";
import {useLists} from '../../hooks'
import EmailConfirmationModal from '../../components/EmailConfirmationModal/EmailConfirmationModal.'
import { useUserData } from "../../hooks/useUserData";

export default function Lists() {
  const {userData} = useUserData()
  const [showList, setShowList] = useState("mylist");
  const {data,isLoading,HandleRemoveList,HandleShareList} = useLists()
  return (
    <div className="ListsContainer">
       {userData && (!userData.emailConfirmed && !userData.googleUser) ? <EmailConfirmationModal email={userData.email}/>:''}
      <Header name="Listinhas" />
      <NewList/>
      <br />
      <div className="ListSelect">
        <div className="ListSelectItem" onClick={() => setShowList("mylist")}>
          <BsFillPersonFill
            size={25}
            color={showList === "mylist" ? "#47C8EC" : "#CCC"}
          />
        </div>
        <div
          className="ListSelectItem"
          onClick={() => setShowList("sharedlist")}
        >
          <BsFillPeopleFill
            size={25}
            color={showList === "sharedlist" ? "#47C8EC" : "#CCC"}
          />
        </div>
      </div>

      <div
        style={
          showList === "mylist"
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        <h2 className="subtitle">Minhas listas</h2>
        <div>
          {isLoading? <Loading/>: !data?.myLists?.length ? (
            <h2 className="subtitle">Você ainda não criou nenhuma lista</h2>
          ) : (
            data?.myLists?.map((list, index) => {
              return (
                <CreatedList
                  key={'myList'+list._id.toString()}
                  removefunction={HandleRemoveList}
                  HandleShareList={HandleShareList}
                  listname={list.name}
                  listdate={list.createdAt}
                  id={list._id}
                  ownerId={list.ownerId}
                  listitens={list.items}
                  index={index}
                  sharedWith={list.sharedWith}
                  listShared={false}
                />
              );
            })
          )}
        </div>
      </div>

      <div
        style={
          showList === "sharedlist"
            ? { display: "flex", flexDirection: "column" }
            : { display: "none" }
        }
      >
        <h2 className="subtitle">Lista compartilhadas</h2>
        <div>
          {isLoading? <Loading/>: !data?.sharedLists?.length ? (
            <h2 className="subtitle">
              Ninguem compartilhou nenhuma lista com você ainda
            </h2>
          ) : (
            data?.sharedLists?.map((list, index) => {
              return (
                <CreatedList
                  key={`${list._id}Shared`}
                  removefunction={HandleRemoveList}
                  HandleShareList={HandleShareList}
                  listname={list.name}
                  listdate={list.createdAt}
                  id={list._id}
                  ownerId={list.ownerId}
                  listitens={list.items}
                  index={index}
                  sharedWith={list.sharedWith}
                  listShared={true}
                />
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
