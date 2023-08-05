"use client";

import { FC, useState, useTransition } from "react";
import { Photo, PhotoSearchResponse } from "../type";
import { VscSearch } from "react-icons/vsc";
import { Loading } from "./Loading";
import { PhotoList } from "./PhotoList";

const PhotoListWrapper: FC<{
  loading: boolean;
  searchedPhotos: Photo[] | null;
  randomPhotos: Photo[];
}> = ({ loading, searchedPhotos, randomPhotos }) => {
  if (loading) {
    return <Loading />;
  }

  if (searchedPhotos) {
    return <PhotoList photos={searchedPhotos} />;
  }

  return <PhotoList photos={randomPhotos} />;
};

const Search: FC<{
  randomPhotos: Photo[];
}> = ({ randomPhotos }) => {
  const [query, setQuery] = useState<string | null>(null);
  const [searchedPhotos, setSearchedPhotos] = useState<Photo[] | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [loading, startTransition] = useTransition();

  // 検索処理を関数として切り出します。
  const handleSearch = async () => {
    console.log("search");
    try {
      setSearching(true);
      const response = await fetch("http://localhost:3000/api/search", {
        method: "POST",
        body: JSON.stringify({ query }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("検索に失敗しました");
      }

      const json: PhotoSearchResponse = await response.json();
      startTransition(() => {
        setSearchedPhotos(json.results);
      });
    } catch (error) {
      console.error(error);
      alert("検索中にエラーが発生しました");
      setSearchedPhotos([]);
    } finally {
      setSearching(false);
    }
  };

  // フォームのサブミットイベント
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // デフォルトのサブミット動作を防ぐ
    handleSearch(); // 検索処理を呼び出す
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="my-1 flex justify-center">
        <input
          className="w-96 mr-4 p-2 bg-gray-700"
          value={query ?? ""}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button type="submit" className="bg-gray-700 py-2 px-4">
          <VscSearch />
        </button>
      </form>
      <PhotoListWrapper
        loading={searching || loading}
        searchedPhotos={searchedPhotos}
        randomPhotos={randomPhotos}
      />
    </div>
  );
};

export { Search };
