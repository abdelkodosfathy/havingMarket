import React from 'react'

const TokenSender = () => {
    window.opener.postMessage({
        tokenSender: "its the popup lasttt"
    }, "*");

    // Close the popup
    // window.close();
  return (
    <div>TokenSender</div>
  )
}

export default TokenSender