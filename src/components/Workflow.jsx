import React, { useEffect, useState } from "react";
import { GitMerge } from "lucide-react";
import codeImg from "../assets/code.jpg";
import axios from "axios";

const Workflow = () => {
  const ViewMorePRcount = 5;
  const hiddenUsers = ["darkhorse404", "SamarthTech", "anirban12x"];

  // Point values for each repo
  const POINTS = {
    WEB: 25,    // Web Project PRs
    PYTHON: 20, // Python Project PRs
    NONCODE: 5  // Low/Non Code Project PRs
  };

  const [repoMergedPRs, setRepoMergedPRs] = useState({
    repo1: [], // Web
    repo2: [], // Python
    repo3: [], // Non-code
  });
  const [overallMergedPRs, setOverallMergedPRs] = useState([]);
  const [showMore, setShowMore] = useState({
    repo1: ViewMorePRcount,
    repo2: ViewMorePRcount,
    repo3: ViewMorePRcount,
  });

  const fetchGitHubData = async (owner, repo) => {
    try {
      const token = import.meta.env.VITE_GITHUB_TOKEN || process.env.REACT_APP_GITHUB_TOKEN;

      if (!token) {
        console.error("GitHub token is not set");
        return [];
      }

      const prsResponse = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100`,
        { headers: { Authorization: `token ${token}` } }
      );
      
      const prsResponsePage2 = await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/pulls?state=closed&base=main&per_page=100&page=2`,
        { headers: { Authorization: `token ${token}` } }
      );

      prsResponse.data=prsResponse.data.concat(prsResponsePage2.data);

      const mergedPRCounts = prsResponse.data.reduce((acc, pr) => {
        const isInvalid = pr.labels.some(
          (label) => label.name.toLowerCase() === "invalid"
        );
        if (pr.merged_at && !isInvalid) {
          const user = pr.user.login;
          if (!acc[user]) {
            acc[user] = {
              count: 0,
              points: 0,
              avatar_url: pr.user.avatar_url,
              last_merge_date: pr.merged_at,
            };
          }
          acc[user].count += 1;
          // Points will be assigned later based on repo type
          if (new Date(pr.merged_at) > new Date(acc[user].last_merge_date))
            acc[user].last_merge_date = pr.merged_at;
        }
        return acc;
      }, {});

      const sortedByCount = Object.entries(mergedPRCounts)
        .map(([login, data]) => ({ login, ...data }))
        .sort((a, b) => {
          if (a.count === b.count) {
            return new Date(a.last_merge_date) - new Date(b.last_merge_date);
          }
          return b.count - a.count;
        });

      return sortedByCount;
    } catch (error) {
      console.error(`Error fetching GitHub data for ${owner}/${repo}:`, error);
      return [];
    }
  };

  useEffect(() => {
    const fetchAllRepoData = async () => {
      const repo1Data = await fetchGitHubData("SamarthTech", "web-projects-2024");
      const repo2Data = await fetchGitHubData("SamarthTech", "python-projects-2024");
      const repo3Data = await fetchGitHubData("SamarthTech", "noncode-projects-2024");

      // Calculate points for each repo
      repo1Data.forEach(user => user.points = user.count * POINTS.WEB);
      repo2Data.forEach(user => user.points = user.count * POINTS.PYTHON);
      repo3Data.forEach(user => user.points = user.count * POINTS.NONCODE);

      setRepoMergedPRs({
        repo1: repo1Data,
        repo2: repo2Data,
        repo3: repo3Data,
      });
    };

    fetchAllRepoData();
  }, []);

  useEffect(() => {
    const calculateOverallLeaderboard = () => {
      // Create a map to store user data
      const userPoints = new Map();

      // Process Web Projects (repo1)
      repoMergedPRs.repo1.forEach(pr => {
        if (!userPoints.has(pr.login)) {
          userPoints.set(pr.login, {
            points: 0,
            avatar_url: pr.avatar_url,
            prs: { web: 0, python: 0, noncode: 0 }
          });
        }
        const userData = userPoints.get(pr.login);
        userData.points += pr.count * POINTS.WEB;
        userData.prs.web = pr.count;
      });

      // Process Python Projects (repo2)
      repoMergedPRs.repo2.forEach(pr => {
        if (!userPoints.has(pr.login)) {
          userPoints.set(pr.login, {
            points: 0,
            avatar_url: pr.avatar_url,
            prs: { web: 0, python: 0, noncode: 0 }
          });
        }
        const userData = userPoints.get(pr.login);
        userData.points += pr.count * POINTS.PYTHON;
        userData.prs.python = pr.count;
      });

      // Process Non-Code Projects (repo3)
      repoMergedPRs.repo3.forEach(pr => {
        if (!userPoints.has(pr.login)) {
          userPoints.set(pr.login, {
            points: 0,
            avatar_url: pr.avatar_url,
            prs: { web: 0, python: 0, noncode: 0 }
          });
        }
        const userData = userPoints.get(pr.login);
        userData.points += pr.count * POINTS.NONCODE;
        userData.prs.noncode = pr.count;
      });

      // Convert map to array and sort by points
      const sortedOverallPoints = Array.from(userPoints.entries())
        .map(([login, data]) => ({
          login,
          ...data
        }))
        .sort((a, b) => b.points - a.points);

      // Filter out hidden users
      const filteredOverallPoints = sortedOverallPoints.filter(
        (pr) => !hiddenUsers.includes(pr.login)
      );

      setOverallMergedPRs(filteredOverallPoints.slice(0, 5));
    };

    calculateOverallLeaderboard();
  }, [repoMergedPRs]);

  const renderLeaderboard = (mergedPRs, title, isOverall, repoNo) => {
    const filteredMergedPRs = mergedPRs.filter(
      (pr) => !hiddenUsers.includes(pr.login)
    );

    var showmoreRepo = null;
    if (repoNo == 1) showmoreRepo = showMore.repo1;
    else if (repoNo == 2) showmoreRepo = showMore.repo2;
    else if (repoNo == 3) showmoreRepo = showMore.repo3;

    const displayedPRs = filteredMergedPRs.slice(
      0,
      isOverall ? ViewMorePRcount : showmoreRepo
    );

    return (
      <div className="w-full p-2 px-4 lg:w-1/3">
        <h3 className="mt-6 text-2xl tracking-wide text-center mb-6">
          {title}
        </h3>
        {displayedPRs.length === 0 ? (
          <p className="text-center text-neutral-500">
            No Merged Pull Requests...
          </p>
        ) : (
          displayedPRs.map((pr, index) => {
            const borderStyle = isOverall
              ? index === 0
                ? { border: "2px solid gold" }
                : index === 1
                  ? { border: "2px solid silver" }
                  : index === 2
                    ? { border: "2px solid #cd7f32" }
                    : { border: "2px solid #slate-600" }
              : {};

            return (
              <a
                key={pr.login}
                href={`https://github.com/${pr.login}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center p-3 mb-4 transition-all duration-500 ease-out border-2 border-slate-600 rounded-xl hover:border-slate-800 scale-sm cursor-pointer`}
                style={borderStyle}
              >
                <div className="flex items-center justify-center w-10 h-10 mr-4 text-2xl font-bold text-purple-400 bg-neutral-900 rounded-full">
                  {index + 1}
                </div>
                <img
                  src={pr.avatar_url}
                  alt={`${pr.login}'s avatar`}
                  className="w-12 h-12 mr-4 rounded-full"
                />
                <div className="flex-grow flex-shrink overflow-x-hidden">
                  <h5 className="text-xl custom-word-wrap">{pr.login}</h5>
                  {isOverall ? (
                    <div>
                      <p className="text-sm text-neutral-500">
                        Total Dinos: {pr.points}
                      </p>
                      {/* <p className="text-xs text-neutral-400">
                        PRs: Web ({pr.prs.web}), Python ({pr.prs.python}), Non-Code ({pr.prs.noncode})
                      </p> */}
                    </div>
                  ) : (
                    <div>
                      <p className="text-sm text-neutral-500">
                        Dinos: {pr.points} ({pr.count} PRs)
                      </p>
                    </div>
                  )}
                </div>
                <div className="text-purple-400">
                  <GitMerge size={24} />
                </div>
              </a>
            );
          })
        )}
        {!isOverall && filteredMergedPRs.length > ViewMorePRcount && (
          <div className="w-full flex flex-col justify-center items-center mt-6 mb-5">
            <div className="w-full text-center text-neutral-500 text-sm">
              Showing{" "}
              {repoNo == 1 ? (
                <p className="inline-block">
                  {showMore.repo1 > filteredMergedPRs.length
                    ? filteredMergedPRs.length
                    : showMore.repo1}
                </p>
              ) : repoNo == 2 ? (
                <p className="inline-block">
                  {showMore.repo2 > filteredMergedPRs.length
                    ? filteredMergedPRs.length
                    : showMore.repo2}
                </p>
              ) : repoNo == 3 ? (
                <p className="inline-block">
                  {showMore.repo3 > filteredMergedPRs.length
                    ? filteredMergedPRs.length
                    : showMore.repo3}
                </p>
              ) : (
                <></>
              )}{" "}
              out of {filteredMergedPRs.length}
            </div>
            <div className="w-full flex flex-row justify-center items-center mt-4">
              <button
                className="inline-block border-b-2 border-white-500 w-max text-center text-white-500 px-0 hover:px-4 hover:text-purple-400 hover:border-purple-400 transition-all duration-100 ease-in"
                onClick={() => {
                  if (repoNo == 1) {
                    setShowMore({
                      ...showMore,
                      repo1:
                        showMore.repo1 >= filteredMergedPRs.length
                          ? showMore.repo1 - ViewMorePRcount
                          : showMore.repo1 + ViewMorePRcount,
                    });
                  } else if (repoNo == 2) {
                    setShowMore({
                      ...showMore,
                      repo2:
                        showMore.repo2 >= filteredMergedPRs.length
                          ? showMore.repo2 - ViewMorePRcount
                          : showMore.repo2 + ViewMorePRcount,
                    });
                  } else if (repoNo == 3) {
                    setShowMore({
                      ...showMore,
                      repo3:
                        showMore.repo3 >= filteredMergedPRs.length
                          ? showMore.repo3 - ViewMorePRcount
                          : showMore.repo3 + ViewMorePRcount,
                    });
                  }
                }}
              >
                {showmoreRepo >= filteredMergedPRs.length
                  ? "Show Less"
                  : "View More"}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="mt-20">
      <h2 className="mt-6 text-3xl tracking-wide text-center sm:text-5xl lg:text-6xl">
        Our Open Source {" "}
        <span className="text-transparent bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text">
          DINO POINTS LEADERBOARDS
        </span>
      </h2>

      <div className="w-full max-w-4xl mx-auto mt-8 mb-16 px-4">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-center mb-6 text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              Point System
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Web Development",
                  points: 25,
                  description: "Per Pull Request",
                  icon: "🌐"
                },
                {
                  title: "Python & AIML",
                  points: 20,
                  description: "Per Pull Request",
                  icon: "🐍"
                },
                {
                  title: "Non-Code",
                  points: 5,
                  description: "Per Pull Request",
                  icon: "📝"
                }
              ].map((category, index) => (
                <div
                  key={index}
                  className="group relative p-4 rounded-xl border border-purple-500/20 bg-black/20 backdrop-blur-sm
                      transition-all duration-300 hover:scale-105 hover:bg-purple-500/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-4xl">{category.icon}</span>
                    <span className="text-2xl font-bold text-purple-400">
                      {category.points} Dinos
                    </span>
                  </div>
                  <h4 className="text-lg font-semibold mb-1 text-white/90">
                    {category.title}
                  </h4>
                  <p className="text-sm text-white/60">
                    {category.description}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-center text-sm text-white/50 mt-6">
              Points are awarded for each successfully merged pull request
            </p>
          </div>
        
      </div>

      <div className="flex flex-wrap justify-center">
        <div className="w-full justify-center flex ">
          <img src={codeImg} alt="Coding" />
        </div>
      </div>

      <h3 className="mt-12 text-3xl tracking-wide text-center">
        Overall Leaderboard
      </h3>
      <div className="flex flex-wrap justify-center">
        {renderLeaderboard(overallMergedPRs, "The Top 5", true)}
      </div>

      <div className="flex flex-wrap justify-center mt-12">
        {renderLeaderboard(repoMergedPRs.repo1, "Web Dev Projects", false, 1)}
        {renderLeaderboard(repoMergedPRs.repo2, "Python and AIML Projects", false, 2)}
        {renderLeaderboard(repoMergedPRs.repo3, "Low and Non Code Projects", false, 3)}
      </div>
    </div>
  );
};

export default Workflow;
