--
-- PostgreSQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

-- Started on 2022-04-30 21:07:04

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 209 (class 1259 OID 40972)
-- Name: programs; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.programs (
    id bigint NOT NULL,
    name text
);


ALTER TABLE public.programs OWNER TO postgres;

--
-- TOC entry 210 (class 1259 OID 40977)
-- Name: academic_program_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.academic_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.academic_program_id_seq OWNER TO postgres;

--
-- TOC entry 3351 (class 0 OID 0)
-- Dependencies: 210
-- Name: academic_program_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.academic_program_id_seq OWNED BY public.programs.id;


--
-- TOC entry 217 (class 1259 OID 41100)
-- Name: course_subject; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.course_subject (
    id bigint NOT NULL,
    id_subject bigint NOT NULL,
    id_teacher bigint,
    start_date date,
    end_date date
);


ALTER TABLE public.course_subject OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 40978)
-- Name: enrolled_subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.enrolled_subjects (
    id bigint NOT NULL,
    id_student bigint NOT NULL,
    id_course_subject bigint NOT NULL,
    first_score numeric(3,2),
    second_score numeric(3,2),
    third_score numeric(3,2)
);


ALTER TABLE public.enrolled_subjects OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 40981)
-- Name: enrolled_subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.enrolled_subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.enrolled_subjects_id_seq OWNER TO postgres;

--
-- TOC entry 3352 (class 0 OID 0)
-- Dependencies: 212
-- Name: enrolled_subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.enrolled_subjects_id_seq OWNED BY public.enrolled_subjects.id;


--
-- TOC entry 213 (class 1259 OID 40982)
-- Name: people; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.people (
    id bigint NOT NULL,
    names character varying(50) NOT NULL,
    surnames character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    profile character varying(30) NOT NULL,
    semester integer,
    id_program bigint
);


ALTER TABLE public.people OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 40985)
-- Name: people_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.people_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.people_id_seq OWNER TO postgres;

--
-- TOC entry 3353 (class 0 OID 0)
-- Dependencies: 214
-- Name: people_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;


--
-- TOC entry 215 (class 1259 OID 40986)
-- Name: subjects; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.subjects (
    id bigint NOT NULL,
    name character varying(50),
    credits integer,
    id_program bigint
);


ALTER TABLE public.subjects OWNER TO postgres;

--
-- TOC entry 216 (class 1259 OID 40989)
-- Name: subjects_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subjects_id_seq OWNER TO postgres;

--
-- TOC entry 3354 (class 0 OID 0)
-- Dependencies: 216
-- Name: subjects_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;


--
-- TOC entry 3184 (class 2604 OID 40990)
-- Name: enrolled_subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_subjects ALTER COLUMN id SET DEFAULT nextval('public.enrolled_subjects_id_seq'::regclass);


--
-- TOC entry 3185 (class 2604 OID 40991)
-- Name: people id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);


--
-- TOC entry 3183 (class 2604 OID 40992)
-- Name: programs id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.academic_program_id_seq'::regclass);


--
-- TOC entry 3186 (class 2604 OID 40993)
-- Name: subjects id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);


--
-- TOC entry 3345 (class 0 OID 41100)
-- Dependencies: 217
-- Data for Name: course_subject; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.course_subject (id, id_subject, id_teacher, start_date, end_date) FROM stdin;
\.


--
-- TOC entry 3339 (class 0 OID 40978)
-- Dependencies: 211
-- Data for Name: enrolled_subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.enrolled_subjects (id, id_student, id_course_subject, first_score, second_score, third_score) FROM stdin;
\.


--
-- TOC entry 3341 (class 0 OID 40982)
-- Dependencies: 213
-- Data for Name: people; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.people (id, names, surnames, email, password, profile, semester, id_program) FROM stdin;
2	carlos	torres	carlos@gmail.com	123	Teacher	\N	2
34	mario	castillo	mario@gmail.com	123	Teacher	\N	1
35	laura	sierra	lau@gmail.com	123	Teacher	\N	3
36	horacio	sanchez	hor@gmail.com	123	Student	6	1
1	juan	tous	juan@gmail.com	123	Student	5	1
37	carlos	santander	carl@gmail.com	123	Student	5	1
38	camila	sanchez	cami@gmail.com	123	Student	8	2
39	mauricio	sanchez	mau@gmail.com	123	Student	6	1
41	ronal	piu	ron@gmail.com	123	Teacher	\N	2
42	ronal	piu	ron@gmail.com	123	Teacher	\N	3
43	ronal	piu	ron@gmail.com	123	Teacher	\N	1
40	ronal	piu	ron@gmail.com	123	Student	9	1
44	James	Perez	james@gmail.com	123	Student	1	2
\.


--
-- TOC entry 3337 (class 0 OID 40972)
-- Dependencies: 209
-- Data for Name: programs; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.programs (id, name) FROM stdin;
\.


--
-- TOC entry 3343 (class 0 OID 40986)
-- Dependencies: 215
-- Data for Name: subjects; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.subjects (id, name, credits, id_program) FROM stdin;
\.


--
-- TOC entry 3355 (class 0 OID 0)
-- Dependencies: 210
-- Name: academic_program_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.academic_program_id_seq', 5, true);


--
-- TOC entry 3356 (class 0 OID 0)
-- Dependencies: 212
-- Name: enrolled_subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.enrolled_subjects_id_seq', 9, true);


--
-- TOC entry 3357 (class 0 OID 0)
-- Dependencies: 214
-- Name: people_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.people_id_seq', 44, true);


--
-- TOC entry 3358 (class 0 OID 0)
-- Dependencies: 216
-- Name: subjects_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.subjects_id_seq', 3, true);


--
-- TOC entry 3188 (class 2606 OID 40995)
-- Name: programs academic_program_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.programs
    ADD CONSTRAINT academic_program_pkey PRIMARY KEY (id);


--
-- TOC entry 3196 (class 2606 OID 41104)
-- Name: course_subject course_subject_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.course_subject
    ADD CONSTRAINT course_subject_pkey PRIMARY KEY (id);


--
-- TOC entry 3190 (class 2606 OID 40997)
-- Name: enrolled_subjects enrolled_subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_subjects
    ADD CONSTRAINT enrolled_subjects_pkey PRIMARY KEY (id);


--
-- TOC entry 3192 (class 2606 OID 40999)
-- Name: people people_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);


--
-- TOC entry 3194 (class 2606 OID 41001)
-- Name: subjects subjects_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);


--
-- TOC entry 3197 (class 2606 OID 41105)
-- Name: enrolled_subjects FK_id_course_subject; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.enrolled_subjects
    ADD CONSTRAINT "FK_id_course_subject" FOREIGN KEY (id_course_subject) REFERENCES public.course_subject(id) ON DELETE CASCADE NOT VALID;


-- Completed on 2022-04-30 21:07:04

--
-- PostgreSQL database dump complete
--

