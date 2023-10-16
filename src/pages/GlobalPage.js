import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Box } from 'rebass'
import styled from 'styled-components'

import { AutoRow, RowBetween } from '../components/Row'
import { AutoColumn } from '../components/Column'
import PairList from '../components/PairList'
import TopTokenList from '../components/TokenList'
import TxnList from '../components/TxnList'
import GlobalChart from '../components/GlobalChart'
import Search from '../components/Search'
import GlobalStats from '../components/GlobalStats'

import { useGlobalData, useGlobalTransactions } from '../contexts/GlobalData'
import { useAllPairData } from '../contexts/PairData'
import { useMedia } from 'react-use'
import Panel from '../components/Panel'
import { useAllTokenData } from '../contexts/TokenData'
import { formattedNum, formattedPercent } from '../utils'
import { TYPE, ThemedBackground } from '../Theme'
import { transparentize } from 'polished'
import { CustomLink } from '../components/Link'

import { PageWrapper, ContentWrapper } from '../components'
import CheckBox from '../components/Checkbox'
import QuestionHelper from '../components/QuestionHelper'
import { Type } from 'react-feather'

const ListOptions = styled(AutoRow)`
  height: 40px;
  width: 100%;
  font-size: 1.25rem;
  font-weight: 600;

  @media screen and (max-width: 640px) {
    font-size: 1rem;
  }
`

const GridRow = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  align-items: start;
  justify-content: space-between;
`

const TotalInfo = styled.div`
  display: grid;
  grid-gap: 1em;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem 1.125rem;
  border: 1px solid #7e7e7e;
  margin: 20px 0
`

const Primary = styled.span`
  color: ${({theme}) => theme.primary};
`

function GlobalPage() {
  // get data for lists and totals
  const allPairs = useAllPairData()
  const allTokens = useAllTokenData()
  const transactions = useGlobalTransactions()
  const { totalLiquidityUSD, oneDayVolumeUSD, volumeChangeUSD, liquidityChangeUSD } = useGlobalData()

  // breakpoints
  const below800 = useMedia('(max-width: 800px)')

  // scrolling refs
  useEffect(() => {
    document.querySelector('body').scrollTo({
      behavior: 'smooth',
      top: 0,
    })
  }, [])

  // for tracked data on pairs
  const [useTracked, setUseTracked] = useState(true)

  return (
    <PageWrapper>
      <ThemedBackground backgroundColor={transparentize(0.6, '#a0a0a0')} />
      <ContentWrapper>
        <div>
          {!below800 && (
            <GridRow>
              <Panel style={{ height: '100%', minHeight: '300px' }}>
                <GlobalChart display="liquidity" />
              </Panel>
              <Panel style={{ height: '100%' }}>
                <GlobalChart display="volume" />
              </Panel>
            </GridRow>
          )}
          {below800 && (
            <AutoColumn style={{ marginTop: '6px' }} gap="24px">
              <Panel style={{ height: '100%', minHeight: '300px' }}>
                <GlobalChart display="liquidity" />
              </Panel>
            </AutoColumn>
          )}
          <TotalInfo>
            <TYPE.body>
              volume 24h: {oneDayVolumeUSD ? formattedNum(oneDayVolumeUSD, true) : '-'} 
              <Primary>({volumeChangeUSD ? formattedPercent(volumeChangeUSD) : '-'})</Primary>
            </TYPE.body>
            <TYPE.body>
              fee 24h: {'$879.90k'} 
              <Primary>(${'+13.9%'})</Primary> 
            </TYPE.body>
            <TYPE.body>
              tvl: {totalLiquidityUSD ? formattedNum(totalLiquidityUSD, true) : '-'}
              <Primary>({liquidityChangeUSD ? formattedPercent(liquidityChangeUSD) : '-'})</Primary> 
            </TYPE.body>
          </TotalInfo>
          <ListOptions gap="10px" style={{ marginTop: '2rem', marginBottom: '.5rem' }}>
            <RowBetween>
              <TYPE.primary fontSize={'1.125rem'} style={{ whiteSpace: 'nowrap' }}>
                top tokens
              </TYPE.primary>
              {/* <CustomLink to={'/tokens'}>See All</CustomLink> */}
            </RowBetween>
          </ListOptions>
          <div style={{ margin: '1rem 0' }}>
            <TopTokenList tokens={allTokens} />
          </div>
          <ListOptions gap="10px" style={{ marginTop: '2rem', marginBottom: '.5rem' }}>
            <RowBetween>
              <TYPE.primary fontSize={'1rem'} style={{ whiteSpace: 'nowrap' }}>
                top pools
              </TYPE.primary>
            </RowBetween>
          </ListOptions>
          <div style={{ margin: '1rem 0' }}>
            <PairList pairs={allPairs} useTracked={useTracked} />
          </div>
          <span>
            <TYPE.primary fontSize={'1.125rem'} style={{ marginTop: '2rem' }}>
              transactions
            </TYPE.primary>
          </span>
          <div style={{ margin: '1rem 0' }}>
            <TxnList transactions={transactions} />
          </div>
        </div>
      </ContentWrapper>
    </PageWrapper>
  )
}

export default withRouter(GlobalPage)
