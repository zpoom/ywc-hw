import styled from '@emotion/styled'
import { Tag } from 'antd'
import React, { useEffect, useState } from 'react'

const ShopImage = styled.div`
  /* background: url('https://images.unsplash.com/photo-1597227772909-a6d166b48b79?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80'); */
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
    <div className="border border-gray-500 bg-white lg:flex blog">
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
        </div>
        <div className="flex font-sm flex-wrap mt-1 text-gray-800">
          {categoryName}
          <div className="mx-4 text-gray-900">|</div>
          {priceLevelJsx}
          <div className="mx-4 text-gray-900">|</div>
          {`${addressDistrictName} ${addressProvinceName}`}
        </div>
        <ShopDivider />
      </div>
    </div>
  )
}
