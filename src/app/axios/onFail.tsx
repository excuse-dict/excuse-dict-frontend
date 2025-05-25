import Swal from "sweetalert2"

export const onFailDefault = (error: any) => {

    Swal.fire("오류", "오류가 발생하였습니다.", 'error')
}