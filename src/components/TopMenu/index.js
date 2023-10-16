import React from 'react'
import styled from 'styled-components'
import { AutoRow } from '../Row'
import Title from '../Title'
import { BasicLink } from '../Link'
import { useMedia } from 'react-use'
import { transparentize } from 'polished'
import { TYPE } from '../../Theme'
import { withRouter } from 'react-router-dom'
import { TrendingUp, List, PieChart, Disc } from 'react-feather'
import Link from '../Link'
import { useSessionStart } from '../../contexts/Application'
import { useDarkModeManager } from '../../contexts/LocalStorage'
import Toggle from '../Toggle'
import { Flex } from 'rebass'
import { RowFixed } from '../Row'
import Logo from '../../assets/long-logo.png'

const Wrapper = styled.div`
  height: 80px;
  width: 100%;
  display: flex;
  gap: 10px;
  position: fixed;
  background: #f0f0f0;
  color: ${({ theme }) => theme.text1};
  padding: 0.5rem 0.5rem 0.5rem 0.75rem;
  top: 0px;
  z-index: 9999;
  box-sizing: border-box;
  color: ${({ theme }) => theme.bg2};

  @media screen and (max-width: 800px) {
    grid-template-columns: 1fr;
  }

  @media screen and (max-width: 600px) {
    padding: 1rem;
  }
`

const Option = styled.div`
  font-weight: 700;
  font-size: 14px;
  color: ${({ theme, activeText }) => (activeText ? theme.primary : theme.white)};
  border-bottom: ${({ activeText }) => (activeText ? "2px solid" : "2px solid transparent")};
  padding-bottom: 2px;
  display: flex;
  :hover {
    color: ${({ theme }) => theme.primary};
  }
`

const UniIcon = styled(Link)`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`

const FillSpace = styled.div`
  flex-grow: 1;
`

function TopMenu({ history }) {

  return (
    <Wrapper>
      <Flex alignItems="center" style={{ width: '100%' }}>
        <RowFixed>
          <UniIcon id="link" onClick={() => history.push('/')}>
            <img width={'80px'} src={Logo} alt="logo" />
          </UniIcon>
        </RowFixed>
        <FillSpace/>
        <AutoRow gap="1rem">
          <BasicLink to="/home">
            <Option activeText={history.location.pathname === '/home' ?? undefined}>
              {/* <TrendingUp size={20} style={{ marginRight: '.35rem' }} /> */}
              overview
            </Option>
          </BasicLink>
          <BasicLink to="/tokens">
            <Option
              activeText={
                (history.location.pathname.split('/')[1] === 'tokens' ||
                  history.location.pathname.split('/')[1] === 'token') ??
                undefined
              }
            >
              {/* <Disc size={20} style={{ marginRight: '.35rem' }} /> */}
              tokens
            </Option>
          </BasicLink>
          <BasicLink to="/pairs">
            <Option
              activeText={
                (history.location.pathname.split('/')[1] === 'pairs' ||
                  history.location.pathname.split('/')[1] === 'pair') ??
                undefined
              }
            >
              {/* <PieChart size={20} style={{ marginRight: '.35rem' }} /> */}
              pairs
            </Option>
          </BasicLink>
        </AutoRow>
      </Flex>
    </Wrapper>
  )
}

export default withRouter(TopMenu)
