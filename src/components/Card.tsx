import styled from '@emotion/styled'
import { Tag, Tooltip } from 'antd'
import React from 'react'
import parse from 'html-react-parser'
import { insertAssetPrefix } from 'utils/const'

const ShopImage = styled.div`
  background-size: cover !important;
  background-repeat: no-repeat;
  background-position: center center;
  min-height: 14rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`

const ShopDivider = styled.div`
  width: 65%;
  height: 1px;
  background-color: rgb(238, 238, 238);
  margin: 18px 0px;
`

const ShopImageWrapper = styled.div`
  padding: 5px;
  @media (min-width: 1024px) {
    width: 250px;
  }
`

const ShopFacilityIconContainer = styled.div`
  margin-right: 6px;
  margin-bottom: 3px;
  padding: 5px;
  border-radius: 20px;
  border: 1px solid rgb(108, 191, 95);
  img {
    height: 1.1rem;
    width: 1.1rem;
  }
`

interface CardProps {
  shopName: string
  thumbnail?: string
  categoryName: string
  addressDistrictName: string
  addressProvinceName: string
  isOpen: string
  facilities: string[]
  priceLevel: number
  highlightText: string
  recommendedItems: string[]
}

export const Card = ({
  shopName,
  thumbnail,
  categoryName,
  addressDistrictName,
  addressProvinceName,
  isOpen,
  facilities,
  priceLevel,
  highlightText,
  recommendedItems,
}: CardProps) => {
  const priceLevelJsx = []
  for (let i = 0; i < priceLevel; i++) {
    priceLevelJsx.push(
      <span className="text-gray-800" key={`shopName${i}`}>
        ฿
      </span>,
    )
  }
  for (let i = 0; i < 4 - priceLevel; i++) {
    priceLevelJsx.push(
      <span className="text-gray-500" key={`shopName${priceLevel + i}`}>
        ฿
      </span>,
    )
  }

  return (
    <div className="border border-gray-500 bg-white lg:flex blog cursor-pointer">
      <ShopImageWrapper>
        <ShopImage
          style={{ background: `url(${thumbnail})` }}
          className="w-full h-full"
        />
      </ShopImageWrapper>
      <div className="flex-1 p-4">
        <div className="flex items-center">
          <div className="text-xl font-semibold">{shopName}</div>
          {isOpen === 'Y' && (
            <Tag className="ml-4" color="#1bc300">
              เปิดอยู่
            </Tag>
          )}
          {isOpen === 'N' && (
            <Tag className="ml-4" color="#A1A1A1">
              ปิดอยู่
            </Tag>
          )}
        </div>
        <div className="flex font-sm flex-wrap mt-1 text-gray-800">
          {categoryName}
          <div className="mx-4 text-gray-900">|</div>
          {priceLevelJsx}
          <div className="mx-4 text-gray-900">|</div>
          {`${addressDistrictName} ${addressProvinceName}`}
        </div>
        <ShopDivider />
        <div className="flex font-base mb-2 text-gray-800">
          {parse(highlightText, { trim: false })}
        </div>
        <div className="flex font-base flex-wrap items-center mb-2">
          <div className="mr-2 font-semibold">เมนูแนะนำ:</div>
          <div className="mr-1">{recommendedItems.join(',')}</div>
        </div>
        <div className="flex font-base flex-wrap mb-4 mt-4">
          {facilities.map((facility, idx) => (
            <Tooltip title={facility} key={`fac_${facility}_${idx}`}>
              <ShopFacilityIconContainer>
                <img src={insertAssetPrefix(`${facility}.png`)} />
              </ShopFacilityIconContainer>
            </Tooltip>
          ))}
        </div>
      </div>
    </div>
  )
}
