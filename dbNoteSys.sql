PGDMP                         z         	   dbNoteSys    14.2    14.2                 0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    24648 	   dbNoteSys    DATABASE     g   CREATE DATABASE "dbNoteSys" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
    DROP DATABASE "dbNoteSys";
                postgres    false            �            1259    32780    programs    TABLE     H   CREATE TABLE public.programs (
    id bigint NOT NULL,
    name text
);
    DROP TABLE public.programs;
       public         heap    postgres    false            �            1259    32779    academic_program_id_seq    SEQUENCE     �   CREATE SEQUENCE public.academic_program_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.academic_program_id_seq;
       public          postgres    false    212                       0    0    academic_program_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.academic_program_id_seq OWNED BY public.programs.id;
          public          postgres    false    211            �            1259    32795    enrolled_subjects    TABLE     �   CREATE TABLE public.enrolled_subjects (
    id bigint NOT NULL,
    id_student bigint NOT NULL,
    id_subject bigint NOT NULL,
    id_teacher bigint NOT NULL,
    first_score numeric(3,2),
    second_score numeric(3,2),
    third_score numeric(3,2)
);
 %   DROP TABLE public.enrolled_subjects;
       public         heap    postgres    false            �            1259    32794    enrolled_subjects_id_seq    SEQUENCE     �   CREATE SEQUENCE public.enrolled_subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.enrolled_subjects_id_seq;
       public          postgres    false    214                       0    0    enrolled_subjects_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.enrolled_subjects_id_seq OWNED BY public.enrolled_subjects.id;
          public          postgres    false    213            �            1259    24650    people    TABLE     >  CREATE TABLE public.people (
    id bigint NOT NULL,
    names character varying(50) NOT NULL,
    surnames character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    password character varying(50) NOT NULL,
    profile character varying(30) NOT NULL,
    semester integer,
    id_program bigint
);
    DROP TABLE public.people;
       public         heap    postgres    false            �            1259    24649    people_id_seq    SEQUENCE     v   CREATE SEQUENCE public.people_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 $   DROP SEQUENCE public.people_id_seq;
       public          postgres    false    210                       0    0    people_id_seq    SEQUENCE OWNED BY     ?   ALTER SEQUENCE public.people_id_seq OWNED BY public.people.id;
          public          postgres    false    209            �            1259    32802    subjects    TABLE     �   CREATE TABLE public.subjects (
    id bigint NOT NULL,
    name character varying(50),
    credits integer,
    id_program bigint
);
    DROP TABLE public.subjects;
       public         heap    postgres    false            �            1259    32801    subjects_id_seq    SEQUENCE     x   CREATE SEQUENCE public.subjects_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.subjects_id_seq;
       public          postgres    false    216                       0    0    subjects_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.subjects_id_seq OWNED BY public.subjects.id;
          public          postgres    false    215            m           2604    32798    enrolled_subjects id    DEFAULT     |   ALTER TABLE ONLY public.enrolled_subjects ALTER COLUMN id SET DEFAULT nextval('public.enrolled_subjects_id_seq'::regclass);
 C   ALTER TABLE public.enrolled_subjects ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    214    214            k           2604    24653 	   people id    DEFAULT     f   ALTER TABLE ONLY public.people ALTER COLUMN id SET DEFAULT nextval('public.people_id_seq'::regclass);
 8   ALTER TABLE public.people ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    210    209    210            l           2604    32783    programs id    DEFAULT     r   ALTER TABLE ONLY public.programs ALTER COLUMN id SET DEFAULT nextval('public.academic_program_id_seq'::regclass);
 :   ALTER TABLE public.programs ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    212    211    212            n           2604    32805    subjects id    DEFAULT     j   ALTER TABLE ONLY public.subjects ALTER COLUMN id SET DEFAULT nextval('public.subjects_id_seq'::regclass);
 :   ALTER TABLE public.subjects ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215    216                      0    32795    enrolled_subjects 
   TABLE DATA           {   COPY public.enrolled_subjects (id, id_student, id_subject, id_teacher, first_score, second_score, third_score) FROM stdin;
    public          postgres    false    214   ]"                 0    24650    people 
   TABLE DATA           e   COPY public.people (id, names, surnames, email, password, profile, semester, id_program) FROM stdin;
    public          postgres    false    210   �"                 0    32780    programs 
   TABLE DATA           ,   COPY public.programs (id, name) FROM stdin;
    public          postgres    false    212   S#       	          0    32802    subjects 
   TABLE DATA           A   COPY public.subjects (id, name, credits, id_program) FROM stdin;
    public          postgres    false    216   �#                  0    0    academic_program_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.academic_program_id_seq', 3, true);
          public          postgres    false    211                       0    0    enrolled_subjects_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.enrolled_subjects_id_seq', 7, true);
          public          postgres    false    213                       0    0    people_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.people_id_seq', 38, true);
          public          postgres    false    209                       0    0    subjects_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.subjects_id_seq', 3, true);
          public          postgres    false    215            r           2606    32787    programs academic_program_pkey 
   CONSTRAINT     \   ALTER TABLE ONLY public.programs
    ADD CONSTRAINT academic_program_pkey PRIMARY KEY (id);
 H   ALTER TABLE ONLY public.programs DROP CONSTRAINT academic_program_pkey;
       public            postgres    false    212            t           2606    32809 (   enrolled_subjects enrolled_subjects_pkey 
   CONSTRAINT     f   ALTER TABLE ONLY public.enrolled_subjects
    ADD CONSTRAINT enrolled_subjects_pkey PRIMARY KEY (id);
 R   ALTER TABLE ONLY public.enrolled_subjects DROP CONSTRAINT enrolled_subjects_pkey;
       public            postgres    false    214            p           2606    24657    people people_pkey 
   CONSTRAINT     P   ALTER TABLE ONLY public.people
    ADD CONSTRAINT people_pkey PRIMARY KEY (id);
 <   ALTER TABLE ONLY public.people DROP CONSTRAINT people_pkey;
       public            postgres    false    210            v           2606    32807    subjects subjects_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.subjects
    ADD CONSTRAINT subjects_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.subjects DROP CONSTRAINT subjects_pkey;
       public            postgres    false    216               2   x�3�4�4�4�� .#����	B�(Td�1�46+����qqq �Ye         �   x�}��� Eg�1��&��/�ҎY,�*��%__��P�N����K�A�)CID6��t��`R �4\-��,gPB  ���\���}�z����ā�/�BO�%B�32F���RWL�_½b�j~f��V9~����C[�efEp��4�f��2!�kW         B   x�3��,.I�-VH�K��KM-��K�2��I,�2�L*-�+8��f�e�%�d��q��qqq ^)�      	   7   x�3��M,��4�4�2�(�O/J����K�4�s���dgppq��qqq /��     