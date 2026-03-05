import { css } from "@arrhes/ui/utilities/cn.js"

export function DocTable(props: { headers: string[]; rows: string[][] }) {
    return (
        <div
            className={css({
                overflowX: "auto",
                borderRadius: "lg",
                border: "1px solid",
                borderColor: "neutral/10",
                backgroundColor: "white",
            })}
        >
            <table
                className={css({
                    width: "100%",
                    borderCollapse: "collapse",
                })}
            >
                <thead>
                    <tr
                        className={css({
                            backgroundColor: "neutral/5",
                            borderBottom: "1px solid",
                            borderColor: "neutral/10",
                        })}
                    >
                        {props.headers.map((header, index) => (
                            <th
                                key={index}
                                className={css({
                                    padding: "0.5rem",
                                    textAlign: "left",
                                    fontSize: "xs",
                                    fontWeight: "semibold",
                                    color: "neutral/60",
                                    textTransform: "uppercase",
                                    letterSpacing: "wider",
                                })}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {props.rows.map((row, rowIndex) => (
                        <tr
                            key={rowIndex}
                            className={css({
                                borderBottom: "1px solid",
                                borderColor: "neutral/10",
                                _last: { borderBottom: "none" },
                                _hover: { backgroundColor: "neutral/3" },
                                transition: "colors",
                            })}
                        >
                            {row.map((cell, cellIndex) => (
                                <td
                                    key={cellIndex}
                                    className={css({
                                        padding: "0.5rem",
                                        fontSize: "sm",
                                        color: "neutral/70",
                                        lineHeight: "1.5",
                                    })}
                                >
                                    {cell}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
