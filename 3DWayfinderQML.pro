TEMPLATE += app

QT += qml quick

# The .cpp file which was generated for your project. Feel free to hack it.
SOURCES += main.cpp \
    qtquick2applicationviewer/qtquick2applicationviewer.cpp

# Installation path
# target.path =

# Please do not modify the following two lines. Required for deployment.
include(qtquick2applicationviewer/qtquick2applicationviewer.pri)
qtcAddDeployment()

RESOURCES += \
    resources.qrc

DISTFILES += \
    qmldir

HEADERS += \
    qtquick2applicationviewer/qtquick2applicationviewer.h
