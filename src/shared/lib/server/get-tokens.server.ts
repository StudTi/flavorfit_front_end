'use server'

import { ACCESS_TOKEN, REFRESH_TOKEN } from "@/shared/constants/app.constants";
import { CombinedGraphQLErrors } from "@apollo/client";
import { NextResponse, type NextRequest } from "next/server";
import { getApolloClient } from "../apollo/apollo-client";
import { GetNewTokensDocument, type GetNewTokensQuery } from "@/__generated__/graphql";
import { GRAPHQL_SERVER_URL } from "@/shared/config/api.config";
import { PAGES } from "@/shared/config/page.config";
import { set } from "react-hook-form";

export async function getTokens(request: NextRequest) {
  const refreshToken = request.cookies.get(REFRESH_TOKEN)?.value
  let accessToken = request.cookies.get(ACCESS_TOKEN)?.value

  if (!refreshToken) {
    request.cookies.delete(ACCESS_TOKEN)
    return null
  }

  if (!accessToken) {
    try {

      const refreshResponse = await fetch(GRAPHQL_SERVER_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          cookie: request.headers.get('cookie') ?? ''
        }, 
        body: JSON.stringify({
          query: `
          query {
            newTokens {
              user {id}
            }
          }
          `
        })
      })
      
    if (!refreshResponse.ok) {
      return null 
    }
      const setCookie = refreshResponse.headers.get('set-cookie')
      
      return {
        isRefreshedToken: true,
        setCookie
      }

// Переобновление токена на проверку ошибок.
      
    } catch (error) {
      if (CombinedGraphQLErrors.is(error)) {
        const isInvalid = error.errors.some(
          e => 
            e.message == 'invalid token' ||
            e.extensions?.code == 'UNAUTHENTICATED'
        )

      if (isInvalid) {
        console.log('Токен доступа недействителен, удалите его')
        request.cookies.delete(ACCESS_TOKEN)
        request.cookies.delete(REFRESH_TOKEN)
        return null
        }
      }

      return null
    }
  }

  return {
    refreshToken,
    accessToken
  }
}