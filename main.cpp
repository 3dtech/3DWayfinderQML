#include <QtGui/QGuiApplication>
#include "src/qtquick2applicationviewer.h"
#include <QQmlContext>
#include "src/blescanner.h"

int main(int argc, char *argv[])
{
    QGuiApplication app(argc, argv);
    BLEScanner scanner;

    QtQuick2ApplicationViewer viewer;
    viewer.rootContext()->setContextProperty(QStringLiteral("blescanner"), &scanner);
    viewer.setMainQmlFile(QStringLiteral("qrc:/qml/WayfinderQML.qml"));
    viewer.setSource(QStringLiteral("qrc:/qml/WayfinderQML.qml"));
    viewer.showExpanded();

    return app.exec();
}
