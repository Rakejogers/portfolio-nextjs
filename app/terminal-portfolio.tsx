"use client";

import { useEffect, useMemo, useReducer, useRef } from "react";
import type { FormEvent } from "react";
import Image from "next/image";
import { portfolioData } from "@/lib/portfolio-data";
import type { PortfolioAsset } from "@/lib/portfolio-data";

type CommandKey = "about" | "contact" | "education" | "experience" | "help" | "projects" | "skills";
type ResolvedCommand = CommandKey | "unknown";

type HistoryEntry = {
  id: number;
  rawCommand: string;
  resolved: ResolvedCommand;
  state: "loading" | "done";
  progress: number;
};

type DetailSelection =
  | {
      index: number;
      kind: "experience";
    }
  | {
      index: number;
      kind: "project";
    };

type TerminalState = {
  history: HistoryEntry[];
  input: string;
  introChar: number;
  introIndex: number;
  isRunning: boolean;
  selectedDetail: DetailSelection | null;
  spinnerFrame: number;
};

type TerminalAction =
  | { type: "inputChanged"; value: string }
  | { type: "introAdvanced" }
  | { type: "introSkipped" }
  | { type: "commandCleared" }
  | { type: "commandQueued"; command: string; id: number; resolved: Exclude<ResolvedCommand, "unknown"> }
  | { type: "unknownCommandQueued"; command: string; id: number }
  | { type: "commandProgressed"; id: number }
  | { type: "commandCompleted"; id: number }
  | { type: "detailSelected"; selection: DetailSelection }
  | { type: "spinnerAdvanced" };

type IntroSegment = {
  id: string;
  pause?: number;
  speed?: number;
  text: string;
};

type IntroTyping = {
  active: (id: string) => boolean;
  complete: boolean;
  started: (id: string) => boolean;
  text: (id: string, value: string) => string;
};

const { contact, education, experience, profile, projects, skills, skillsOutput } = portfolioData;

const bootLines = [
  "System initialized v1.0.4",
  "Loading modules...",
  "Mounting developer profile...",
  "Ready.",
];

const asciiName = [
  "       _         _  ________   _____   ____   _____ ______ _____   _____ ",
  "      | |  /\\   | |/ /  ____| |  __ \\ / __ \\ / ____|  ____|  __ \\ / ____|",
  "      | | /  \\  | ' /| |__    | |__) | |  | | |  __| |__  | |__) | (___  ",
  "  _   | |/ /\\ \\ |  < |  __|   |  _  /| |  | | | |_ |  __| |  _  / \\___ \\ ",
  " | |__| / ____ \\| . \\| |____  | | \\ \\| |__| | |__| | |____| | \\ \\ ____) |",
  "  \\____/_/    \\_\\_|\\_\\______| |_|  \\_\\\\____/ \\_____|______|_|  \\_\\_____/ ",
  "                                                                         ",
];

const commandMenu: Array<{ command: CommandKey; description: string; label: string }> = [
  { command: "projects", label: "projects", description: "list repositories and case studies" },
  { command: "experience", label: "experience", description: "read experience log" },
  { command: "skills", label: "skills", description: "open resource monitor" },
  { command: "contact", label: "contact", description: "display links and contact info" },
  { command: "education", label: "education", description: "inspect academic profile" },
  { command: "about", label: "about", description: "print profile summary" },
];

const spinnerFrames = ["|", "/", "-", "\\"];
const statusFocus = profile.bio.replace("I build ", "").replace(".", "").toLowerCase();

const introSegments: IntroSegment[] = [
  ...bootLines.map((line, index) => ({
    id: `boot-${index}`,
    pause: index === bootLines.length - 1 ? 220 : 120,
    speed: line === "Ready." ? 34 : 18,
    text: line,
  })),
  ...asciiName.map((line, index) => ({
    id: `ascii-${index}`,
    pause: index === asciiName.length - 1 ? 180 : 35,
    speed: 2,
    text: line,
  })),
  { id: "profile-headline", pause: 120, speed: 12, text: profile.headline },
  { id: "profile-bio", pause: 180, speed: 10, text: profile.bio },
  { id: "hint-prefix", speed: 12, text: "Type a command or " },
  { id: "hint-help", pause: 80, speed: 16, text: "help" },
  { id: "hint-suffix", pause: 130, speed: 12, text: " to see available options." },
  ...commandMenu.flatMap((item) => [
    { id: `menu-${item.command}-label`, pause: 35, speed: 14, text: item.label },
    { id: `menu-${item.command}-description`, pause: 55, speed: 9, text: item.description },
  ]),
  { id: "status-online", speed: 18, text: "[online]" },
  { id: "status-profile", speed: 12, text: "profile.loaded = true" },
  { id: "status-school", speed: 10, text: `school: ${education.school.toLowerCase()}` },
  { id: "status-focus", pause: 180, speed: 8, text: `focus: ${statusFocus}` },
];

const allTech = Array.from(
  new Set([
    ...skills,
    ...projects.flatMap((project) => project.tech),
    ...experience.flatMap((item) => item.tech),
  ]),
);

const initialTerminalState: TerminalState = {
  history: [],
  input: "",
  introChar: 0,
  introIndex: 0,
  isRunning: false,
  selectedDetail: null,
  spinnerFrame: 0,
};

function terminalReducer(state: TerminalState, action: TerminalAction): TerminalState {
  switch (action.type) {
    case "inputChanged":
      return { ...state, input: action.value };
    case "introAdvanced": {
      const segment = introSegments[state.introIndex];

      if (!segment) return state;
      if (state.introChar < segment.text.length) {
        return { ...state, introChar: state.introChar + 1 };
      }

      return { ...state, introChar: 0, introIndex: state.introIndex + 1 };
    }
    case "introSkipped":
      return { ...state, introChar: 0, introIndex: introSegments.length };
    case "commandCleared":
      return { ...state, history: [], input: "", selectedDetail: null };
    case "commandQueued":
      return {
        ...state,
        history: [
          ...state.history,
          { id: action.id, rawCommand: action.command, resolved: action.resolved, state: "loading", progress: 0 },
        ],
        input: "",
        isRunning: true,
        selectedDetail: null,
      };
    case "unknownCommandQueued":
      return {
        ...state,
        history: [
          ...state.history,
          { id: action.id, rawCommand: action.command, resolved: "unknown", state: "done", progress: 100 },
        ],
        input: "",
        selectedDetail: null,
      };
    case "commandProgressed":
      return {
        ...state,
        history: state.history.map((entry) =>
          entry.id === action.id ? { ...entry, progress: Math.min(100, entry.progress + 12) } : entry,
        ),
      };
    case "commandCompleted":
      return {
        ...state,
        history: state.history.map((entry) =>
          entry.id === action.id ? { ...entry, progress: 100, state: "done" } : entry,
        ),
        isRunning: false,
      };
    case "detailSelected":
      return { ...state, selectedDetail: action.selection };
    case "spinnerAdvanced":
      return { ...state, spinnerFrame: state.spinnerFrame + 1 };
    default:
      return state;
  }
}

function resolveCommand(command: string): ResolvedCommand | "clear" {
  const normalized = command.trim().toLowerCase().replace(/^\/+/, "").replace(/\s+/g, " ");

  if (["", "help", "?", "commands"].includes(normalized)) return "help";
  if (["clear", "reset"].includes(normalized)) return "clear";
  if (["about", "whoami", "home", "init"].includes(normalized)) return "about";
  if (["projects", "project", "ls ./projects", "ls projects", "repos"].includes(normalized)) {
    return "projects";
  }
  if (["experience", "work", "cat experience.log", "resume"].includes(normalized)) {
    return "experience";
  }
  if (["skills", "top -skills", "top skills", "resource monitor"].includes(normalized)) {
    return "skills";
  }
  if (["contact", "links", "email"].includes(normalized)) return "contact";
  if (["education", "school", "cat education.log"].includes(normalized)) return "education";

  return "unknown";
}

function displayCommand(command: string) {
  const trimmed = command.trim();
  if (!trimmed) return "/help";
  return trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
}

function loadingMessage(command: ResolvedCommand) {
  switch (command) {
    case "projects":
      return "Retrieving repositories...";
    case "experience":
      return "Reading experience.log...";
    case "skills":
      return "Profiling capabilities...";
    case "contact":
      return "Resolving contact endpoints...";
    case "education":
      return "Reading education.log...";
    case "about":
      return "Mounting profile summary...";
    case "help":
      return "Listing commands...";
    default:
      return "Parsing command...";
  }
}

function progressString(progress: number) {
  const total = 14;
  const filled = Math.min(total, Math.floor((progress / 100) * total));
  const arrow = progress >= 100 ? "=" : ">";
  const head = progress >= 100 ? total : Math.max(0, filled - 1);
  const tail = progress >= 100 ? 0 : total - head - 1;

  return `[${"=".repeat(head)}${arrow}${" ".repeat(tail)}]`;
}

function commandLabel(command: ResolvedCommand) {
  switch (command) {
    case "projects":
      return "ls ./projects";
    case "experience":
      return "cat experience.log";
    case "skills":
      return "top -skills";
    case "contact":
      return "contact";
    case "education":
      return "cat education.log";
    case "about":
      return "whoami";
    case "help":
      return "help";
    default:
      return "unknown";
  }
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function clampText(value: string, maxLength: number) {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength - 3)}...`;
}

function techLevel(tech: string) {
  const appearances =
    (skills.includes(tech) ? 2 : 0) +
    projects.filter((project) => project.tech.includes(tech)).length +
    experience.filter((item) => item.tech.includes(tech)).length;

  return (
    skillsOutput.levels
      .toSorted((a, b) => b.minAppearances - a.minAppearances)
      .find((level) => appearances >= level.minAppearances)?.label ?? "Applied"
  );
}

function resourceBars() {
  return skillsOutput.resources.map((resource) => {
    const matches = allTech.filter((tech) => resource.tech.includes(tech)).length;

    return {
      label: resource.label,
      value: Math.min(resource.max, resource.base + matches * resource.step),
    };
  });
}

function TypeCursor({ active }: { active: boolean }) {
  if (!active) return null;
  return <span className="inline-cursor" aria-hidden="true" />;
}

function BootSequence({ intro }: { intro: IntroTyping }) {
  return (
    <div className="boot-sequence" aria-label="Terminal boot sequence">
      {bootLines.map((line, index) => (
        intro.started(`boot-${index}`) ? (
          <div className="boot-line" key={line}>
            <span className="timestamp">[00:00:0{index}]</span>{" "}
            <span className={line === "Ready." ? "success-text" : undefined}>
              {intro.text(`boot-${index}`, line)}
            </span>
            <TypeCursor active={intro.active(`boot-${index}`)} />
          </div>
        ) : null
      ))}
    </div>
  );
}

function WelcomeBlock({ intro }: { intro: IntroTyping }) {
  const visibleAscii = asciiName
    .map((line, index) => (intro.started(`ascii-${index}`) ? intro.text(`ascii-${index}`, line) : null))
    .filter((line) => line !== null);

  return (
    <section className="terminal-box welcome-block" aria-label="Profile introduction">
      <pre className="ascii-logo" aria-label={profile.name}>
        {visibleAscii.join("\n")}
        {asciiName.some((_, index) => intro.active(`ascii-${index}`)) ? (
          <span className="inline-cursor" aria-hidden="true" />
        ) : null}
      </pre>
      <div className="ascii-rule" />
      {intro.started("profile-headline") ? (
        <p>
          {intro.text("profile-headline", profile.headline)}
          <TypeCursor active={intro.active("profile-headline")} />
        </p>
      ) : null}
      {intro.started("profile-bio") ? (
        <p>
          {intro.text("profile-bio", profile.bio)}
          <TypeCursor active={intro.active("profile-bio")} />
        </p>
      ) : null}
    </section>
  );
}

function HelpMenu({
  disabled = false,
  intro,
  onRunCommand,
}: {
  disabled?: boolean;
  intro?: IntroTyping;
  onRunCommand: (command: CommandKey) => void;
}) {
  return (
    <section className="terminal-box command-menu" aria-label="Available commands">
      {commandMenu.map((item) => {
        const labelId = `menu-${item.command}-label`;
        const descriptionId = `menu-${item.command}-description`;
        const showRow = intro ? intro.started(labelId) : true;
        const label = intro ? intro.text(labelId, item.label) : item.label;
        const description = intro ? intro.text(descriptionId, item.description) : item.description;

        if (!showRow) return null;

        return (
          <button
            className="command-menu-row"
            disabled={disabled}
            key={item.command}
            onClick={() => onRunCommand(item.command)}
            type="button"
          >
            <span className="command-name">
              {label}
              <TypeCursor active={intro?.active(labelId) ?? false} />
            </span>
            <span className="command-divider">|</span>
            <span className="command-description">
              {description}
              <TypeCursor active={intro?.active(descriptionId) ?? false} />
            </span>
          </button>
        );
      })}
    </section>
  );
}

function StatusBar({ intro }: { intro?: IntroTyping }) {
  const online = intro ? intro.text("status-online", "[online]") : "[online]";
  const profileStatus = intro ? intro.text("status-profile", "profile.loaded = true") : "profile.loaded = true";
  const school = intro
    ? intro.text("status-school", `school: ${education.school.toLowerCase()}`)
    : `school: ${education.school.toLowerCase()}`;
  const focus = intro ? intro.text("status-focus", `focus: ${statusFocus}`) : `focus: ${statusFocus}`;

  return (
    <div className="status-bar" aria-label="Profile status">
      {intro?.started("status-online") ?? true ? (
        <span className="success-text">
          {online}
          <TypeCursor active={intro?.active("status-online") ?? false} />
        </span>
      ) : null}
      {intro?.started("status-profile") ?? true ? (
        <span>
          {profileStatus}
          <TypeCursor active={intro?.active("status-profile") ?? false} />
        </span>
      ) : null}
      {intro?.started("status-school") ?? true ? <span className="status-separator">|</span> : null}
      {intro?.started("status-school") ?? true ? (
        <span>
          {school}
          <TypeCursor active={intro?.active("status-school") ?? false} />
        </span>
      ) : null}
      {intro?.started("status-focus") ?? true ? <span className="status-separator">|</span> : null}
      {intro?.started("status-focus") ?? true ? (
        <span>
          {focus}
          <TypeCursor active={intro?.active("status-focus") ?? false} />
        </span>
      ) : null}
    </div>
  );
}

function CommandEcho({ command, resolved }: { command: string; resolved: ResolvedCommand }) {
  return (
    <div className="command-echo">
      <span className="prompt-mark">&gt;</span>{" "}
      <span className="typed-command">{resolved === "unknown" ? displayCommand(command) : commandLabel(resolved)}</span>
    </div>
  );
}

function LoadingOutput({ progress, resolved, spinner }: { progress: number; resolved: ResolvedCommand; spinner: string }) {
  return (
    <div className="loading-output">
      <div>
        <span className="spinner" aria-hidden="true">
          {spinner}
        </span>{" "}
        {loadingMessage(resolved)}
      </div>
      <div>
        <span className="progress-bar">{progressString(progress)}</span>{" "}
        <span className="success-text">{Math.round(progress)}%</span>
      </div>
    </div>
  );
}

function MediaPreview({ projectIndex }: { projectIndex: number }) {
  const project = projects[projectIndex];
  const media: PortfolioAsset | undefined = project.media[0];

  if (!media) {
    return (
      <div className="media-placeholder" aria-label="No project media available">
        <span>[no media artifact]</span>
      </div>
    );
  }

  if (media.type === "video") {
    return (
      <video
        className="detail-media"
        controls
        aria-label={media.alt ?? `${project.title} demo video`}
        playsInline
        poster={media.poster}
        preload="metadata"
        src={media.src}
      >
        <track
          kind="captions"
          label={media.captions?.label ?? "English"}
          src={media.captions?.src}
          srcLang={media.captions?.srcLang ?? "en"}
        />
      </video>
    );
  }

  if (media.type === "image") {
    return (
      <Image
        alt={media.alt ?? `${project.title} screenshot`}
        className="detail-media"
        height={520}
        src={media.src}
        unoptimized
        width={900}
      />
    );
  }

  return (
    <a className="media-placeholder terminal-link" href={media.src} rel="noreferrer" target="_blank">
      open {media.alt ?? "document"}
    </a>
  );
}

function ProjectDetail({ projectIndex }: { projectIndex: number }) {
  const project = projects[projectIndex];

  return (
    <aside className="terminal-box detail-panel" aria-label={`${project.title} details`}>
      <div className="detail-copy">
        <p>
          <span className="terminal-label">selected</span> {slugify(project.title)}
        </p>
        <p>
          <span className="terminal-label">title</span> {project.title}
        </p>
        <p>
          <span className="terminal-label">summary</span> {project.description}
        </p>
        <p>
          <span className="terminal-label">details</span> {project.longDescription}
        </p>
        <p>
          <span className="terminal-label">stack</span> {project.tech.join(", ")}
        </p>
        <div className="detail-links">
          {project.links.map((link) => (
            <a className="terminal-link" href={link.href} key={link.href} rel="noreferrer" target="_blank">
              [{link.label.toLowerCase()}]
            </a>
          ))}
        </div>
      </div>
      <MediaPreview projectIndex={projectIndex} />
    </aside>
  );
}

function ExperienceDetail({ experienceIndex }: { experienceIndex: number }) {
  const item = experience[experienceIndex];

  return (
    <aside className="terminal-box detail-panel experience-detail" aria-label={`${item.role} details`}>
      <div className="detail-copy">
        <p>
          <span className="terminal-label">selected</span> {item.role}
        </p>
        <p>
          <span className="terminal-label">company</span> {item.company}
        </p>
        <p>
          <span className="terminal-label">dates</span> {item.dates}
        </p>
        <p>
          <span className="terminal-label">stack</span> {item.tech.join(", ")}
        </p>
        <div className="detail-log">
          {item.bullets.map((bullet, index) => (
            <p key={bullet}>
              <span className="timestamp">[{String(index + 1).padStart(2, "0")}]</span> {bullet}
            </p>
          ))}
        </div>
      </div>
    </aside>
  );
}

function ProjectsOutput({
  onSelectProject,
  selectedProjectIndex,
}: {
  onSelectProject: (index: number) => void;
  selectedProjectIndex?: number;
}) {
  return (
    <section className="command-output">
      <p>
        {projects.length} repositories indexed - <span className="success-text">{projects.length} active</span> -
        select repository to inspect media
      </p>
      <div className="terminal-box output-scroll">
        <table className="project-table" aria-label="Project repositories">
          <thead>
            <tr className="project-row project-header">
              <th scope="col">REPOSITORY</th>
              <th scope="col">STACK</th>
              <th scope="col">STATUS</th>
              <th scope="col">LINK</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project, index) => {
              const primaryLink = project.links[0];

              return (
                <tr
                  className={`project-row${selectedProjectIndex === index ? " selected-row" : ""}`}
                  key={project.title}
                >
                  <td>
                    <button
                      aria-label={`Inspect ${project.title}`}
                      className="project-select-button"
                      onClick={() => onSelectProject(index)}
                      type="button"
                    >
                      {slugify(project.title)}
                    </button>
                  </td>
                  <td>{clampText(project.tech.join(", "), 54)}</td>
                  <td className="success-text">[ACTIVE]</td>
                  <td>
                    {primaryLink ? (
                      <a className="terminal-link" href={primaryLink.href} rel="noreferrer" target="_blank">
                        {primaryLink.label.toLowerCase()}
                      </a>
                    ) : (
                      "local"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedProjectIndex !== undefined ? <ProjectDetail projectIndex={selectedProjectIndex} /> : null}
    </section>
  );
}

function ExperienceOutput({
  onSelectExperience,
  selectedExperienceIndex,
}: {
  onSelectExperience: (index: number) => void;
  selectedExperienceIndex?: number;
}) {
  return (
    <section className="command-output">
      <p>
        Reading experience.log... <span className="success-text">complete</span> - click role to inspect description
      </p>
      <div className="terminal-box timeline-box">
        {experience.map((item, index) => {
          const branch = index === experience.length - 1 ? "`---" : "|---";

          return (
            <button
              aria-label={`Inspect ${item.role} at ${item.company}`}
              className={`timeline-item selectable-row${selectedExperienceIndex === index ? " selected-row" : ""}`}
              key={`${item.company}-${item.role}`}
              onClick={() => onSelectExperience(index)}
              type="button"
            >
              <span className="timeline-branch" aria-hidden="true">
                {branch}
              </span>
              <div>
                <h2>{item.role}</h2>
                <p>Company: {item.company}</p>
                <p>Dates: {item.dates}</p>
                <div className="timeline-description">
                  {item.bullets.map((bullet) => (
                    <p key={bullet}>Description: {bullet}</p>
                  ))}
                </div>
                <p className="muted-line">Stack: {item.tech.join(", ")}</p>
              </div>
            </button>
          );
        })}
      </div>
      {selectedExperienceIndex !== undefined ? (
        <ExperienceDetail experienceIndex={selectedExperienceIndex} />
      ) : null}
    </section>
  );
}

function ResourceBar({ label, value }: { label: string; value: number }) {
  const total = 24;
  const filled = Math.round((value / 100) * total);

  return (
    <div className="resource-row">
      <span>{label}</span>
      <span className="meter" aria-label={`${label} ${value}%`}>
        [
        <span className="meter-fill">{"|".repeat(filled)}</span>
        <span className="meter-empty">{"|".repeat(total - filled)}</span>]
      </span>
      <span>{value}%</span>
    </div>
  );
}

function SkillColumn({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="skill-column">
      <h2>{title}</h2>
      {items.map((item) => (
        <div className="skill-row" key={item}>
          <span className="skill-bullet" aria-hidden="true">
            *
          </span>
          <span>{item}</span>
          <span className="dot-fill" aria-hidden="true" />
          <span className="success-text">{techLevel(item)}</span>
        </div>
      ))}
    </div>
  );
}

function SkillsOutput() {
  return (
    <section className="command-output">
      <p>
        <span className="timestamp">[00:00:00]</span> Profiling capabilities...{" "}
        <span className="success-text">done</span>
      </p>
      <div className="terminal-box skills-box">
        <div className="resource-grid">
          {resourceBars().map((bar) => (
            <ResourceBar key={bar.label} label={bar.label} value={bar.value} />
          ))}
        </div>
        <div className="ascii-rule" />
        <div className="skill-grid">
          {skillsOutput.columns.map((column) => (
            <SkillColumn items={column.items} key={column.title} title={column.title} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactOutput() {
  return (
    <section className="command-output">
      <div className="terminal-box contact-grid">
        <a className="contact-row" href={`mailto:${contact.email}`}>
          <span>email</span>
          <span>{contact.email}</span>
        </a>
        <a className="contact-row" href={contact.github} rel="noreferrer" target="_blank">
          <span>github</span>
          <span>{contact.github.replace("https://", "")}</span>
        </a>
        <a className="contact-row" href={contact.linkedin} rel="noreferrer" target="_blank">
          <span>linkedin</span>
          <span>{contact.linkedin.replace("https://", "")}</span>
        </a>
        <a className="contact-row" download={contact.resume.downloadName} href={contact.resume.href}>
          <span>resume</span>
          <span>{contact.resume.label}</span>
        </a>
      </div>
    </section>
  );
}

function EducationOutput() {
  return (
    <section className="command-output">
      <div className="terminal-box education-box">
        <p>
          <span className="terminal-label">school</span> {education.school}
        </p>
        <p>
          <span className="terminal-label">degree</span> {education.degree}
        </p>
        <p>
          <span className="terminal-label">graduation</span> {education.expectedGraduation}
        </p>
        <p>
          <span className="terminal-label">gpa</span> {education.gpa}
        </p>
        <p>
          <span className="terminal-label">coursework</span> {education.coursework.join(", ")}
        </p>
        <p>
          <span className="terminal-label">activities</span> {education.activities.join(", ")}
        </p>
      </div>
    </section>
  );
}

function AboutOutput() {
  return (
    <section className="command-output">
      <div className="terminal-box about-output">
        <p>
          <span className="terminal-label">name</span> {profile.name}
        </p>
        <p>
          <span className="terminal-label">headline</span> {profile.headline}
        </p>
        <p>
          <span className="terminal-label">bio</span> {profile.bio}
        </p>
      </div>
    </section>
  );
}

function UnknownOutput({ command }: { command: string }) {
  return (
    <section className="command-output error-text">
      Command not found: {displayCommand(command)}. Type <span className="typed-command">help</span> for available
      commands.
    </section>
  );
}

function Output({
  entry,
  onSelectExperience,
  onSelectProject,
  onRunCommand,
  selectedDetail,
  spinner,
}: {
  entry: HistoryEntry;
  onSelectExperience: (index: number) => void;
  onSelectProject: (index: number) => void;
  onRunCommand: (command: CommandKey) => void;
  selectedDetail: DetailSelection | null;
  spinner: string;
}) {
  if (entry.state === "loading") {
    return <LoadingOutput progress={entry.progress} resolved={entry.resolved} spinner={spinner} />;
  }

  switch (entry.resolved) {
    case "about":
      return <AboutOutput />;
    case "contact":
      return <ContactOutput />;
    case "education":
      return <EducationOutput />;
    case "experience":
      return (
        <ExperienceOutput
          onSelectExperience={onSelectExperience}
          selectedExperienceIndex={selectedDetail?.kind === "experience" ? selectedDetail.index : undefined}
        />
      );
    case "help":
      return <HelpMenu onRunCommand={onRunCommand} />;
    case "projects":
      return (
        <ProjectsOutput
          onSelectProject={onSelectProject}
          selectedProjectIndex={selectedDetail?.kind === "project" ? selectedDetail.index : undefined}
        />
      );
    case "skills":
      return <SkillsOutput />;
    default:
      return <UnknownOutput command={entry.rawCommand} />;
  }
}

export default function Home() {
  const [{ history, input, introChar, introIndex, isRunning, selectedDetail, spinnerFrame }, dispatch] =
    useReducer(terminalReducer, initialTerminalState);
  const idRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const activeSpinner = useMemo(() => spinnerFrames[spinnerFrame % spinnerFrames.length], [spinnerFrame]);
  const introComplete = introIndex >= introSegments.length;
  const intro = useMemo<IntroTyping>(
    () => ({
      active: (id: string) => introSegments[introIndex]?.id === id,
      complete: introComplete,
      started: (id: string) => {
        const segmentIndex = introSegments.findIndex((segment) => segment.id === id);
        return segmentIndex >= 0 && segmentIndex <= introIndex;
      },
      text: (id: string, value: string) => {
        const segmentIndex = introSegments.findIndex((segment) => segment.id === id);
        if (segmentIndex < 0) return value;
        if (segmentIndex < introIndex) return value;
        if (segmentIndex === introIndex) return value.slice(0, introChar);
        return "";
      },
    }),
    [introChar, introComplete, introIndex],
  );

  useEffect(() => {
    if (!introComplete) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    inputRef.current?.focus();
  }, [introComplete, isRunning]);

  useEffect(() => {
    if (introComplete) return;

    const segment = introSegments[introIndex];
    if (!segment) return;

    if (introChar < segment.text.length) {
      const typingTimer = window.setTimeout(() => {
        dispatch({ type: "introAdvanced" });
      }, segment.speed ?? 12);

      return () => window.clearTimeout(typingTimer);
    }

    const nextSegmentTimer = window.setTimeout(() => {
      dispatch({ type: "introAdvanced" });
    }, segment.pause ?? 70);

    return () => window.clearTimeout(nextSegmentTimer);
  }, [introChar, introComplete, introIndex]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [history]);

  useEffect(() => {
    if (introComplete) return;
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [introComplete, introIndex]);

  useEffect(() => {
    if (!isRunning) return;

    const spinnerTimer = window.setInterval(() => {
      dispatch({ type: "spinnerAdvanced" });
    }, 90);

    return () => window.clearInterval(spinnerTimer);
  }, [isRunning]);

  useEffect(() => {
    if (introComplete) return;

    function handleIntroSkip(event: KeyboardEvent) {
      if (event.key !== " " && event.key !== "Enter") return;
      event.preventDefault();
      skipIntro();
    }

    window.addEventListener("keydown", handleIntroSkip);

    return () => window.removeEventListener("keydown", handleIntroSkip);
  }, [introComplete]);

  function skipIntro() {
    dispatch({ type: "introSkipped" });
  }

  function runCommand(command: string, options?: { force?: boolean }) {
    if (!introComplete && !options?.force) return;

    const resolved = resolveCommand(command);

    if (resolved === "clear") {
      dispatch({ type: "commandCleared" });
      return;
    }

    const id = idRef.current + 1;
    idRef.current = id;
    if (resolved === "unknown") {
      dispatch({ type: "unknownCommandQueued", command, id });
      return;
    }

    dispatch({ type: "commandQueued", command, id, resolved });

    const progressTimer = window.setInterval(() => {
      dispatch({ type: "commandProgressed", id });
    }, 90);

    window.setTimeout(() => {
      window.clearInterval(progressTimer);
      dispatch({ type: "commandCompleted", id });
    }, 900);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isRunning || !introComplete) return;
    runCommand(input);
  }

  function handleMenuCommand(command: CommandKey) {
    if (isRunning) return;

    if (!introComplete) {
      skipIntro();
      runCommand(command, { force: true });
      return;
    }

    runCommand(command);
  }

  function handleSelectProject(index: number) {
    dispatch({ type: "detailSelected", selection: { index, kind: "project" } });
  }

  function handleSelectExperience(index: number) {
    dispatch({ type: "detailSelected", selection: { index, kind: "experience" } });
  }

  function handleTerminalClick() {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    inputRef.current?.focus();
  }

  function handlePromptClick() {
    inputRef.current?.focus();
  }

  return (
    <main className="site-shell">
      <section className="browser-frame" aria-label={`${profile.name} terminal portfolio`}>
        <header className="browser-toolbar" aria-hidden="true">
          <div className="traffic-lights">
            <span className="traffic-dot red" />
            <span className="traffic-dot yellow" />
            <span className="traffic-dot green" />
          </div>
          <div className="browser-controls">
            <span>&lt;</span>
            <span>&gt;</span>
          </div>
          <div className="address-bar">lock {profile.name.toLowerCase().replace(/\s+/g, "")}.dev</div>
          <div className="browser-actions">
            <span>*</span>
            <span>+</span>
            <span>[]</span>
          </div>
        </header>

        <div className="terminal-window" onPointerDown={handleTerminalClick}>
          <BootSequence intro={intro} />
          {intro.started("ascii-0") ? <WelcomeBlock intro={intro} /> : null}
          {intro.started("hint-prefix") ? (
            <p className="terminal-hint">
              {intro.text("hint-prefix", "Type a command or ")}
              <span className="typed-command">
                {intro.text("hint-help", "help")}
                <TypeCursor active={intro.active("hint-help")} />
              </span>
              {intro.text("hint-suffix", " to see available options.")}
              <TypeCursor active={intro.active("hint-prefix") || intro.active("hint-suffix")} />
            </p>
          ) : null}
          {intro.started("menu-projects-label") ? (
            <HelpMenu intro={intro} onRunCommand={handleMenuCommand} />
          ) : null}
          {intro.started("status-online") ? <StatusBar intro={intro} /> : null}
          {intro.started("status-online") ? <div className="terminal-separator" /> : null}

          <div className="history" aria-live="polite">
            {history.map((entry) => (
              <div className="history-entry" key={entry.id}>
                <CommandEcho command={entry.rawCommand} resolved={entry.resolved} />
                <Output
                  entry={entry}
                  onSelectExperience={handleSelectExperience}
                  onSelectProject={handleSelectProject}
                  onRunCommand={handleMenuCommand}
                  selectedDetail={selectedDetail}
                  spinner={activeSpinner}
                />
                <div className="terminal-separator" />
              </div>
            ))}
          </div>

          {introComplete ? (
            <form className="active-prompt" onSubmit={handleSubmit}>
              <label className="sr-only" htmlFor="terminal-command">
                Terminal command
              </label>
              <span className="prompt-mark">&gt;</span>
              <span className="prompt-path">/</span>
              <input
                autoCapitalize="none"
                autoComplete="off"
                autoCorrect="off"
                disabled={isRunning}
                id="terminal-command"
                onChange={(event) => dispatch({ type: "inputChanged", value: event.target.value })}
                onPointerDown={handlePromptClick}
                ref={inputRef}
                spellCheck={false}
                style={{ width: `${Math.max(input.length, 1)}ch` }}
                type="text"
                value={input}
              />
              <span className="cursor-block" aria-hidden="true" />
            </form>
          ) : null}
          <div ref={endRef} />
        </div>
      </section>
    </main>
  );
}
