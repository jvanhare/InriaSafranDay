import { createRoot } from "react-dom/client";

import {
  FlexBox,
  Heading,
  Link,
  ListItem,
  Text,
  UnorderedList,
} from "spectacle";

import "katex/dist/katex.min.css";
import Latex from "react-latex-next";

import Alert from "./components/Alert";
import Centered from "./components/Centered";
import Equation from "./components/Equation";
import Full from "./components/Full";
import Image from "./components/Image";
import InriaDeck from "./components/InriaDeck";
import TwoColumns from "./components/TwoColumns";

import "./index.css";

const Presentation = () => (
  <InriaDeck>
    <Full>
      <Heading color="primary" textAlign="left">
        Context and motivations
      </Heading>
      <Text>
        <UnorderedList>
          <ListItem>
            3rd AIAA Sonic Boom Prediction Prediction Workshop{" "}
            <Link color="lightblue" href="https://lbpw.larc.nasa.gov/sbpw3">
              [https://lbpw.larc.nasa.gov/sbpw3]
            </Link>
          </ListItem>
          <UnorderedList>
            <ListItem>
              Two part workshop covering both the state-of-the-art for
              predicting near field sonic boom signatures with CFD as well as
              propagation of the near field pressures to the ground.
            </ListItem>

            <ListItem>C608 case flow conditions:</ListItem>
            <UnorderedList>
              <ListItem>
                <Latex>{`$M = 1.3 ~ [-] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ Re = 376,850 ~ [in^{-1}] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ T = 374 ~ [R] $`}</Latex>
              </ListItem>
              <ListItem>
                <Latex>{`$ \\alpha = 0.0 ~ [-] $`}</Latex>
              </ListItem>
            </UnorderedList>
          </UnorderedList>
        </UnorderedList>
      </Text>
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        Workshop results
      </Heading>
      <Image
        fileName="c608_symmetry.png"
        legend="C608 Low-Boom Flight Demonstrator solution obtained with WOLF on the finest L2-norm adapted mesh"
        width="90%"
      />
    </Full>

    <TwoColumns
      title="Workshop results"
      left={
        <Image
          fileName="c608_dp_xcut_540.png"
          legend={"x/L = 0.50"}
          width="90%"
        />
      }
      right={
        <Image
          fileName="c608_dp_xcut_810.png"
          legend={"x/L = 0.75"}
          width="90%"
        />
      }
    ></TwoColumns>

    <TwoColumns
      title="Workshop results"
      left={
        <Image
          fileName="c608_dp_xcut_1080.png"
          legend={"x/L = 1.00"}
          width="90%"
        />
      }
      right={
        <Image
          fileName="c608_dp_xcut_1350.png"
          legend={"x/L = 1.25"}
          width="90%"
        />
      }
    ></TwoColumns>

    <TwoColumns
      title="Workshop results"
      left={
        <Image
          fileName="c608_dp_xcut_1620.png"
          legend={"x/L = 1.50"}
          width="90%"
        />
      }
      right={
        <Image
          fileName="c608_dp_xcut_1890.png"
          legend={"x/L = 1.75"}
          width="90%"
        />
      }
    ></TwoColumns>

    <Full>
      <Heading color="primary" textAlign="left">
        But...
      </Heading>
      <Image
        fileName="c608_conv.pdf"
        legend="Mesh convergence of C608 Low-Boom Flight Demonstrator test case"
        width="40%"
      />
    </Full>

    <Full>
      <Heading color="primary" textAlign="left">
        MPI library
      </Heading>
      <UnorderedList>
        <ListItem>
          Need for a MPI library to handle unstructured meshes
        </ListItem>
        <ListItem>
          Not to <Alert>decrease</Alert> the computational time
        </ListItem>
        <ListItem>
          But to <Alert>increase</Alert> the computation size
        </ListItem>
        <ListItem>
          To obtain scalability, everything should be done in parallel (reading,
          partitioning, migrating, ...)
        </ListItem>
        <ListItem>
          Written in C with a clear and simple API (ReadMesh, PartMesh, ...)
        </ListItem>
        <ListItem>
          Will be used to get a MPI version of WOLF and Feflo.a
        </ListItem>
      </UnorderedList>
    </Full>

    <TwoColumns
      title="Distributed or partitioned?"
      left={
        <Image fileName="dist.pdf" legend={"Distributed view"} width="70%" />
      }
      right={<Image fileName="part.pdf" legend={"Part view"} width="70%" />}
    ></TwoColumns>

    <Full>
      <Heading color="primary" textAlign="left">
        Distributed approach
      </Heading>

      <UnorderedList>
        <ListItem>
          The array of triangles storing the global numbering of each triangle:
        </ListItem>
        <UnorderedList>
          <ListItem>
            On MPI rank 0 in red, the array of triangles reads: [1, 2, 3, 4, 5,
            6, 7, 8, 9, 10, 11, 12, 13].
          </ListItem>
          <ListItem>
            On MPI rank 1 in blue, the array of triangles reads: [14, 15, 16,
            17, 18, 19, 20, 21, 22, 23, 24, 25, 26].
          </ListItem>
        </UnorderedList>
        <ListItem>
          The array of the triangles distribution, whose size is the number of
          MPI ranks plus one, shared by all the MPI ranks reads: [0, 13, 26].
          When used in this manner, each MPI rank knows that the triangles 1 to
          13 are on the first MPI rank and the triangles 14 to 26 are on the
          second MPI rank.
        </ListItem>
      </UnorderedList>

      <Heading color="primary" textAlign="left">
        Partitioned approach
      </Heading>

      <UnorderedList>
        <ListItem>
          The array of triangles storing the global numbering of each triangle:
        </ListItem>
        <UnorderedList>
          <ListItem>
            On MPI rank 0 in red, the array of triangles reads: [1, 2, 3, 4, 5,
            6, 7, 8, 9, 10, 11, 12, 13].
          </ListItem>
          <ListItem>
            On MPI rank 1 in blue, the array of triangles reads: [1, 2, 3, 4, 5,
            6, 7, 8, 9, 10, 11, 12, 13].
          </ListItem>
        </UnorderedList>
        <ListItem>
          The array of the link between the local and the global numbering:
        </ListItem>
        <UnorderedList>
          <ListItem>
            On MPI rank 0 in red, the global numbering reads: [9, 19, 23, 20,
            24, 8, 1, 21, 22, 6, 7, 12, 11].
          </ListItem>
          <ListItem>
            On MPI rank 1 in blue, the global numbering reads: [13, 14, 4, 3,
            18, 17, 2, 16, 26, 5, 15, 10, 25].
          </ListItem>
        </UnorderedList>
      </UnorderedList>
    </Full>

    <Centered>
      <Heading color="secondary">Conclusions & perspectives</Heading>
      <UnorderedList>
        <ListItem>
          Some applications needs very large meshes to achieve convergence
        </ListItem>
        <ListItem>
          Ongoing development of a general MPI library to handle unstructured
          meshes
        </ListItem>
        <ListItem>Based on a distributed/partitioned approach</ListItem>
        <ListItem>
          Will be used to obtain a MPI version of WOLF and Feflo.a
        </ListItem>
      </UnorderedList>
    </Centered>
  </InriaDeck>
);

const root = createRoot(document.getElementById("root")!);
root.render(<Presentation />);

