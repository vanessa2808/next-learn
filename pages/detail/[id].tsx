import { Row, Button, Col } from "antd";
import { useRouter } from "next/router";
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import styles from "styles/Home.module.css";

export async function getStaticProps({ params }) {
  const prisma = new PrismaClient();
  const song = await prisma.song.findUnique({
    include: { artist: true },
    where: {
      id: Number(params.id),
    },
  });

  return {
    props: {
      song,
    },
  };
}

export async function getStaticPaths() {
  const prisma = new PrismaClient();
  const songs = await prisma.song.findMany();

  return {
    paths: songs.map((song) => ({
      params: {
        id: song.id.toString(),
      },
    })),
    fallback: false,
  };
}
export default function Home({ song }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/create");
  };

  return (
    <Col>
      <Row className={styles.container}>
        <Col className={styles.customHeaderTitle}>MY SONG</Col>
        <Row className={styles.customBorderStyle}></Row>
        <div className="flex justify-center items-center mt-10">
          <Row className="w-[50%]">
            <Col className="font-bold text-[25px]">{song.name}</Col>
            <p color="grey.700">{song.artist?.name}</p>
            <iframe
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${song.youtubeId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <Link href="/" passHref>
              <Button className={styles.customButtonSubmit}>Back</Button>
            </Link>
          </Row>
        </div>
      </Row>
    </Col>
  );
}
