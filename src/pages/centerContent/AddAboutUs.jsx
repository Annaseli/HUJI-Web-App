import {useEffect, useState} from "react";
import {useFirestore} from "../../hooks/useFirestore";
import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../config";
import useGetCenterContent from "../../hooks/useGetCenterContent";
import AddContent from "./AddContent";

// TODO - front: create a form that adds or edits the aboutUS paragraph to the db.
export default function AddAboutUs() {
    console.log("Add About Us")
    return AddContent("description")
}