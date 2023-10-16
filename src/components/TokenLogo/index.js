import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
// import { isAddress } from '../../utils/index.js'
import DefaultLogo from '../../assets/placeholder.png'

const WHITE_LIST = [
  "0x0e97c7a0f8b2c9885c8ac9fc6136e829cbc21d42", // MUTE
  "0x5aea5775959fbc2557cc8789bc1bf90a239d9a91", // ETH
  "0x85d84c774cf8e9ff85342684b0e795df72a24908", // VC
  "0x3355df6d4c9c3035724fd0e3914de96a5a83aaf4", // USDC
  "0xd0ea21ba66b67be636de1ec4bd9696eb8c61e9aa", // OT
  "0x8e86e46278518efc1c5ced245cba2c7e3ef11557", // USD+
  "0x6631c14ddd4919ff6b5c36d0750ac7372f766dbb", // GMD
  "0xc8ac6191cdc9c7bf846ad6b52aaaa7a0757ee305", // Metavault Trade(MVX)
  "0x4c3861906b24a72adc944798c22cc450443a40ac", // Tarot
  
  "0x08741e73e970412e007967639132a60cecfb0ed5", // USDC(TESTNET)
  "0x1cab26bc403cde14df92a76af79fb77e800a2112", // WETH(TESTNET)
]

const BAD_IMAGES = {}

const Inline = styled.div`
  display: flex;
  align-items: center;
  align-self: center;
`

const Image = styled.img`
  width: ${({ size }) => size};
  height: ${({ size }) => size};
  background-color: white;
  border-radius: 50%;
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.075);
`

const StyledEthereumLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  > img {
    width: ${({ size }) => size};
    height: ${({ size }) => size};
  }
`

export default function TokenLogo({ address, header = false, size = '32px', ...rest }) {
  const [error, setError] = useState(false)

  useEffect(() => {
    setError(false)
  }, [address])

  if (error || BAD_IMAGES[address]) {
    return (
      <Inline>
        <span {...rest} alt={''} style={{ fontSize: size }} role="img" aria-label="face">
          🤔
        </span>
      </Inline>
    )
  }

  const isWhiteList = !!(WHITE_LIST.find(item => address && item === address.toLowerCase()))

  return (
    // <Inline>
    //   <Image
    //     {...rest}
    //     alt={''}
    //     src={path}
    //     size={size}
    //     onError={(event) => {
    //       BAD_IMAGES[address] = true
    //       setError(true)
    //       event.preventDefault()
    //     }}
    //   />
    // </Inline>
    <>
      {
        isWhiteList ? <StyledEthereumLogo size={size} {...rest}>
          <img
            src={require(`../../assets/${address?.toLowerCase()}.png`)}
            style={{
              boxShadow: '5px 6px 10px rgba(64, 55, 53, 0.075)',
              borderRadius: '1px',
            }}
            alt=""
            onError={(event) => {
              BAD_IMAGES[address] = true
              setError(true)
              event.preventDefault()
            }}
          />
        </StyledEthereumLogo> : <StyledEthereumLogo size={size} {...rest}>
          <img
            src={DefaultLogo}
            style={{
              boxShadow: '5px 6px 10px rgba(64, 55, 53, 0.075)',
              borderRadius: '24px',
            }}
            alt=""
            onError={(event) => {
              BAD_IMAGES[address] = true
              setError(true)
              event.preventDefault()
            }}
          />
        </StyledEthereumLogo>
      }
    </>
  )
}
