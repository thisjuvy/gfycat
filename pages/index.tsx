import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { getTrendingData } from "./api/trending";
import React, { useEffect, useCallback, useState } from "react";
import { debounce } from "lodash";
import axios from "axios";
import Data, { GfyCat } from "../types";
import {
  Flex,
  Box,
  Heading,
  Container,
  SearchField,
  Divider,
  Text,
  Badge,
} from "gestalt";

// gfycatcell component to render gfycat attributes
const GfyCatCell = (props: { gfycat: GfyCat }) => {
  const { gfycat } = props;
  return (
    <Flex gap={2} direction="row">
      <Box
        rounding={4}
        padding={5}
        borderStyle="shadow"
        dangerouslySetInlineStyle={{
          __style: { backgroundColor: gfycat.avgColor },
        }}
      >
        <Image width={100} height={100} alt="gif" src={gfycat.gif100px}></Image>
      </Box>
      <Flex direction="column" gap={2}>
        <Text weight="bold">{gfycat.title}</Text>
        <Text>{gfycat.gfyName}</Text>
        <Text italic>{"by: " + (gfycat.userName || "anonymous")}</Text>
        <Badge text={"Likes: " + gfycat.likes} />
      </Flex>
    </Flex>
  );
};

const Home: NextPage = (props: any) => {
  // trending ssr
  const {
    data: { gfycats: trendingResults },
  } = props;

  // search state for searchField
  const [search, setSearch] = useState<string>("");

  // search results state when /api/search resolves
  const [searchResults, setSearchResults] = useState<GfyCat[]>([]);

  // debounce calls for search
  const debounceSearch = useCallback(
    debounce(async (search_text) => {
      // call search api only when search_text populated
      if (search_text && search_text != "") {
        const {
          data: { gfycats },
        } = await axios.get("/api/search", {
          params: {
            search_text,
          },
        });
        setSearchResults(gfycats);
      } else {
        // clear results
        setSearchResults([]);
      }
    }, 300),
    []
  );

  useEffect(() => {
    debounceSearch(search);
  }, [search]);

  return (
    <Container>
      <Head>
        <title>gfycat!</title>
        <meta name="description" content="gfycat search and trending" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex gap={5} direction="column">
        <Flex gap={3} direction="column">
          <Heading>Search gfycat</Heading>
          <SearchField
            placeholder="Start typing..."
            accessibilityLabel=""
            id="search"
            onChange={({ value }) => {
              setSearch(value);
            }}
            value={search}
          />
          <Flex direction="column" gap={3}>
            {searchResults.map((gfycat: GfyCat, index: number) => (
              <GfyCatCell gfycat={gfycat} key={index} />
            ))}
          </Flex>
        </Flex>
        <Divider />
        <Box>
          <Heading>Trending gfycat</Heading>
        </Box>
        <Flex direction="column" gap={3}>
          {trendingResults.map((gfycat: GfyCat, index: number) => (
            <GfyCatCell gfycat={gfycat} key={index} />
          ))}
        </Flex>
      </Flex>
    </Container>
  );
};

export const getServerSideProps = async (context: any) => {
  // fetch trending data on server side and load
  const data: Data = await getTrendingData();
  return {
    props: {
      data,
      ...context.props,
    },
  };
};

export default Home;
