import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import axios from "axios";
  import { FaRegTrashAlt } from "react-icons/fa";

  
  export function DeleteLiked(props:{id:string, toRerender:()=>void}) {

    const deleteLiked = () => {
        axios.delete(`/api/remove-quote?id=${props.id}`)
        .then(resp=>console.log(resp))
        .then(props.toRerender)
        .catch(err=>console.error(err));
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button className="bg-purple w-full hover:bg-purple"><FaRegTrashAlt /></Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
                This quote will be deleted from your Liked list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>No</AlertDialogCancel>
            <AlertDialogAction className="bg-purple" onClick={deleteLiked}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  