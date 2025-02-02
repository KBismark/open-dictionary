import ClickedSearch from "@/components/ClickedToSearch";
import { useLocalSearchParams } from "expo-router";

export default function Word(){
    const word = useLocalSearchParams<{word:string}>().word;
    return (
       <ClickedSearch word={word||""} />
    )
}