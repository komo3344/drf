

function deleteAPI(url){

  return(
    fetch(url, {
      method: 'DELETE',
      headers: {Authorization: `JWT ${localStorage.getItem('token')}`}
    })
  )
}

export default {
  deleteAPI
}