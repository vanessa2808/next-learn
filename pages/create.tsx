import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { Row, Button, Col, Input, Form, message } from "antd";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrismaClient } from '@prisma/client';

export async function getStaticProps(dataItem: any) {
  const prisma = new PrismaClient();

  const songItem = await prisma.song.create({
    data: { name: '1' },
  });

  console.log(dataItem);

  return {
    props: {
      songItem
    }
  };
}

export default function Home({ songItem }) {
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    youtubeId: Yup.string().required("YoutubeId is required"),
    albumCoverUrl: Yup.string().required("albumCoverUrl is required"),
    artist: Yup.string().required("Artist is required"),
    artistId: Yup.string().required("ArtistId is required"),
  });
  const onRedirectBack = () => {
    router.push("/");
  };
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = (data: any) => {
    router.push('/');
    // handleCreateSong(data);
    console.log(123);
    return false;
  }
  return (
    <Col>
      <Row className={styles.container}>
        <Col className={styles.customHeaderTitle}>MY SONG</Col>
        <Row className={styles.customBorderStyle}></Row>
        <form className="text-center mt-10" onSubmit={handleSubmit(onSubmit)}>
          <Col>
            <input placeholder=" Name" {...register('name')}  name="name"  className={styles.customFormInput} />
            <Col className={styles.invalidFeedback}>{errors.name?.message}</Col>
          </Col>
          <Col>
            <input
              placeholder=" YoutubeId"
              {...register('youtubeId')}  name="youtubeId"
              className={styles.customFormInputNotFirst}
            />
            <Col className={styles.invalidFeedback}>{errors.youtubeId?.message}</Col>
          </Col>
          <Col>
            <input
              placeholder=" AlbumCoverUrl"
              {...register('albumCoverUrl')}  name="albumCoverUrl"
              className={styles.customFormInputNotFirst}
            />
            <Col className={styles.invalidFeedback}>{errors.albumCoverUrl?.message}</Col>
          </Col>
          <Col>
            <input
              placeholder=" Artist"
              {...register('artist')}  name="artist"
              className={styles.customFormInputNotFirst}
            />
            <Col className={styles.invalidFeedback}>{errors.artist?.message}</Col>
          </Col>
          <Col>
            <input
              placeholder=" ArtistId"
              {...register('artistId')}  name="artistId"
              className={styles.customFormInputNotFirst}
            />
            <Col className={styles.invalidFeedback}>{errors.artistId?.message}</Col>
          </Col>
          <Row className="text-center">
            <button type="submit" className={styles.customButtonSubmit}>Submit</button>
            <Button
              className={styles.customButtonBack}
              onClick={onRedirectBack}
            >
              Back
            </Button>
          </Row>
        </form>
      </Row>
    </Col>
  );
}
