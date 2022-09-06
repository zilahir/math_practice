/* eslint-disable react/jsx-one-expression-per-line */
import styles from "./Home.module.scss";

function Home() {
  return (
    <div className={styles.homeRootContainer}>
      <h1>Matematika középszintű érettségi feladatgenerátor</h1>

      <div className={styles.segment}>
        <h2>Matematika érettségi vizsga</h2>
        <div className={styles.belso}>
          <p>
            A matematika tantárgy minden érettségiző diáknak kötelező
            vizsgatárgy, ha érettségi bizonyítványt szeretne kapni. A tantárgyat
            közép- és emelt szinten lehet teljesíteni. Az oldalon a
            <span> korábbi évek középszintű feladatait</span> érheted el. A
            feladatok az <a href="www.oktatas.hu">Oktatási Hivatal</a>{" "}
            honlapjáról származnak.
          </p>
        </div>
      </div>

      <div className={styles.segment}>
        <h2>Középszintű írásbeli vizsga</h2>
        <div className={styles.belso}>
          <p>Középszinten az írásbeli vizsga két részből áll.</p>
          <p>
            Az 1. rész, amelynek megoldására a vizsgázónak 45 perce van, 12
            egyszerűbb feladatból áll. Ebben a vizsgarészben összesen 30 pont
            érhető el.
          </p>
          <p>
            A 2. részben megadott 6 feladat összetettebb, több témakört is
            magában foglal. Ennek megoldására 135 perc áll rendelkezésre és 70
            pont érhető el.
          </p>
          <p>
            A 6 feladat közül az első három kötelezően megoldandó, míg az utolsó
            3 feladat közül a vizsgázó választ kettőt, amelyet megold.
          </p>
        </div>
      </div>

      <div className={styles.segment}>
        <h2>Miben segít ez az oldal?</h2>
        <div className={styles.belso}>
          <p> Az oldalon lehetőség van: </p>

          <ul>
            <li>Témakörönként szűrni az 1. rész feladatait</li>
            <li>Vizsgaidőszakonként az érettségi feladatsorokat lekérni</li>
            <li>
              Kiválasztott témakör(ök) alapján az 1. feladatrészben előforduló
              feladatokat szűrni
            </li>
            <li>
              Az 1. feladatrész feladataiból a kiválasztott témakör(ök) alapján
              30 pontos feladatsort generálni
            </li>
            <li>
              A 2. feladatrész feladataiból megadott számú feladatot generálni
            </li>
            <li>
              Regisztráció után van lehetőség a generált feladatlapokat PDF-ben
              lementeni.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Home;
