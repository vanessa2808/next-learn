import styles from "../styles/Home.module.css";
import { Row, Button, Col } from "antd";
import { useRouter } from 'next/router'
import { PrismaClient } from '@prisma/client';

export async function getStaticProps() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany({
    include: { artist: true }
  });

  return {
    props: {
      songs
    }
  };
}

export default function Home({ songs }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create")
  }

  return (
    <Col>
      <Row className={styles.container}>
        <Col className={styles.customHeaderTitle}>MY SONG</Col>
        <Row className={styles.customBorderStyle}></Row>
        {songs.map((songItem: any) => (
          <div className={styles.customDivImage} key={songItem.id}>
            <img
              key={songItem.src}
              className={styles.customImageCompo}
              src={songItem.albumCoverUrl}
              onClick={(e) => {
                router.push(`/detail/${songItem.id}`);
              }}
            ></img>
            <Row onClick={(e) => {
                router.push(`/detail/${songItem.id}`);
              }} className={styles.customNameRender}>
              { songItem.name }
              <Col className={styles.customArtistName}>{ songItem.artist?.name}</Col>
            </Row>
          </div>
        ))}
        <Row className="text-left mb-5">
          <Button className={styles.customButtonSubmit} onClick={ handleClick }>Create</Button>
        </Row>
        </Row>
    </Col>
  );
}
